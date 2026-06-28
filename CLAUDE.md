# Ruflo — Claude Code Configuration

## Estado do Projeto (atualizado 2026-06-28)

### Status atual
- **App em produção**: `https://smart-alert-banner-production.up.railway.app`
- **OAuth**: funcionando — `Session.state` corrigido para nullable
- **Banner**: aparecendo com `?smart_banner_preview=1` — usa `position:fixed` + move para topo do DOM
- **App Store**: listing completo submetido para revisão — aguardando aprovação da Shopify (1–5 dias úteis)
- **Extensão Shopify**: versão 9 (`smart-alert-banner-9`) publicada e ativa

### App Store listing — concluído
- **Ícone**: `public/icon-1200x1200.png` — gerado via `scripts/generate-icon.js` (sharp + SVG)
- **Screenshots**: `public/screenshot-{1,2,3}.png` — gerados via `scripts/generate-screenshots.js`
- **Textos**: tagline, short description, full description em `docs/appstore-listing.md`
- **Privacy Policy**: `https://smart-alert-banner-production.up.railway.app/privacy`
- **Support email**: nelodecarvalho@gmail.com
- **Pricing**: Monthly $9.99 / Annual $99.99 / trial 7 dias (ambos)
- **Checklist pós-aprovação**: `docs/pos-revisao-checklist.md`

### Infraestrutura
- **Plataforma**: Railway — projeto `vibrant-rejoicing`, serviço `smart-alert-banner`
- **DB**: PostgreSQL (serviço `Postgres` no mesmo projeto Railway)
- **Builder**: Dockerfile (Railway usa o `Dockerfile` na raiz; `railway.toml` builder é ignorado)

### Variáveis de ambiente no Railway (serviço smart-alert-banner)
- `DATABASE_URL` = `${{Postgres.DATABASE_URL}}` (Reference Variable)
- `SHOPIFY_API_KEY` = `f60a7fca2f7d0164558da2fa611a6272`
- `SHOPIFY_API_SECRET` = (valor secreto no Railway)
- `SHOPIFY_APP_URL` = `https://smart-alert-banner-production.up.railway.app`
- `SCOPES` = `write_script_tags,read_script_tags`
- `NODE_ENV` = `production`

### Build & Start (Dockerfile)
- Build: `npm ci --omit=dev` → `npx prisma generate && npm run build`
- Start (via `railway.toml`): `node scripts/start.js`
  - Roda `prisma migrate deploy` via spawnSync antes de subir o servidor
  - Define `HOST=0.0.0.0` para binding em todas as interfaces

### Próximo passo
Aguardar email de aprovação da Shopify em nelodecarvalho@gmail.com.
Após aprovação: seguir `docs/pos-revisao-checklist.md` (e2e tests, billing, monitoring, divulgação).

### Arquitetura das rotas
- `app/routes/_index.jsx` — dashboard principal (AppProvider + boundary.headers + loader único)
- `app/routes/api.billing.jsx` — verifica e inicia assinatura (usa plano do shopify.server.js, sem lineItems redundantes)
- `app/routes/api.public.settings.jsx` — API pública com rate limiting (100 req/min/IP)
- `app/routes/privacy.jsx` — página pública de Privacy Policy
- `app/routes/health.jsx` — health check (`/health` → `{"ok":true}`)
- `app/routes/webhooks.*.jsx` — GDPR + app/uninstalled + app/scopes_update
- `extensions/smart-banner/blocks/banner.liquid` — banner com geo-check + preview bypass (`?smart_banner_preview=1`)

### Bugs corrigidos (histórico)
- `Session.state NOT NULL` → OAuth callback falhava silenciosamente → agora nullable
- `prisma generate` no postinstall → falhava porque schema não copiado ainda → movido para Dockerfile após `COPY . .`
- Banner com `position:sticky` + injeção no final do body → invisível → corrigido para `position:fixed`
- `sessionStorage` check antes de preview check → preview bloqueado → reordenado
- `billing.request()` com `lineItems` duplicados conflitando com config → removido, usa só `plan`



## Rules

- Do what has been asked; nothing more, nothing less
- NEVER create files unless absolutely necessary — prefer editing existing files
- NEVER create documentation files unless explicitly requested
- NEVER save working files or tests to root — use `/src`, `/tests`, `/docs`, `/config`, `/scripts`
- ALWAYS read a file before editing it
- NEVER commit secrets, credentials, or .env files
- NEVER add a `Co-Authored-By` trailer to user commits unless this project's `.claude/settings.json` has `attribution.commit` set (#2078). The Claude Code Bash tool may suggest one in its default commit-message template — ignore it. `Co-Authored-By` is semantic authorship attribution under git/GitHub convention; the tool is the facilitator, not a co-author.
- Keep files under 500 lines
- Validate input at system boundaries

## Agent Comms (SendMessage-First Coordination)

Named agents coordinate via `SendMessage`, not polling or shared state.

```
Lead (you) ←→ architect ←→ developer ←→ tester ←→ reviewer
              (named agents message each other directly)
```

### Spawning a Coordinated Team

```javascript
// ALL agents in ONE message, each knows WHO to message next
Agent({ prompt: "Research the codebase. SendMessage findings to 'architect'.",
  subagent_type: "researcher", name: "researcher", run_in_background: true })
Agent({ prompt: "Wait for 'researcher'. Design solution. SendMessage to 'coder'.",
  subagent_type: "system-architect", name: "architect", run_in_background: true })
Agent({ prompt: "Wait for 'architect'. Implement it. SendMessage to 'tester'.",
  subagent_type: "coder", name: "coder", run_in_background: true })
Agent({ prompt: "Wait for 'coder'. Write tests. SendMessage results to 'reviewer'.",
  subagent_type: "tester", name: "tester", run_in_background: true })
Agent({ prompt: "Wait for 'tester'. Review code quality and security.",
  subagent_type: "reviewer", name: "reviewer", run_in_background: true })

// Kick off the pipeline
SendMessage({ to: "researcher", summary: "Start", message: "[task context]" })
```

### Patterns

| Pattern | Flow | Use When |
|---------|------|----------|
| **Pipeline** | A → B → C → D | Sequential dependencies (feature dev) |
| **Fan-out** | Lead → A, B, C → Lead | Independent parallel work (research) |
| **Supervisor** | Lead ↔ workers | Ongoing coordination (complex refactor) |

### Rules

- ALWAYS name agents — `name: "role"` makes them addressable
- ALWAYS include comms instructions in prompts — who to message, what to send
- Spawn ALL agents in ONE message with `run_in_background: true`
- After spawning: STOP, tell user what's running, wait for results
- NEVER poll status — agents message back or complete automatically

## Swarm & Routing

### Config
- **Topology**: hierarchical-mesh (anti-drift)
- **Max Agents**: 15
- **Memory**: hybrid
- **HNSW**: Enabled
- **Neural**: Enabled

```bash
npx @claude-flow/cli@latest swarm init --topology hierarchical --max-agents 8 --strategy specialized
```

### Agent Routing

| Task | Agents | Topology |
|------|--------|----------|
| Bug Fix | researcher, coder, tester | hierarchical |
| Feature | architect, coder, tester, reviewer | hierarchical |
| Refactor | architect, coder, reviewer | hierarchical |
| Performance | perf-engineer, coder | hierarchical |
| Security | security-architect, auditor | hierarchical |

### When to Swarm
- **YES**: 3+ files, new features, cross-module refactoring, API changes, security, performance
- **NO**: single file edits, 1-2 line fixes, docs updates, config changes, questions

### 3-Tier Model Routing

| Tier | Handler | Use Cases |
|------|---------|-----------|
| 1 | Agent Booster (WASM) | Simple transforms — skip LLM, use Edit directly |
| 2 | Haiku | Simple tasks, low complexity |
| 3 | Sonnet/Opus | Architecture, security, complex reasoning |

## Memory & Learning

### Before Any Task
```bash
npx @claude-flow/cli@latest memory search --query "[task keywords]" --namespace patterns
npx @claude-flow/cli@latest hooks route --task "[task description]"
```

### After Success
```bash
npx @claude-flow/cli@latest memory store --namespace patterns --key "[name]" --value "[what worked]"
npx @claude-flow/cli@latest hooks post-task --task-id "[id]" --success true --store-results true
```

### MCP Tools (use `ToolSearch("keyword")` to discover)

| Category | Key Tools |
|----------|-----------|
| **Memory** | `memory_store`, `memory_search`, `memory_search_unified` |
| **Bridge** | `memory_import_claude`, `memory_bridge_status` |
| **Swarm** | `swarm_init`, `swarm_status`, `swarm_health` |
| **Agents** | `agent_spawn`, `agent_list`, `agent_status` |
| **Hooks** | `hooks_route`, `hooks_post-task`, `hooks_worker-dispatch` |
| **Security** | `aidefence_scan`, `aidefence_is_safe`, `aidefence_has_pii` |
| **Hive-Mind** | `hive-mind_init`, `hive-mind_consensus`, `hive-mind_spawn` |

### Background Workers

| Worker | When |
|--------|------|
| `audit` | After security changes |
| `optimize` | After performance work |
| `testgaps` | After adding features |
| `map` | Every 5+ file changes |
| `document` | After API changes |

```bash
npx @claude-flow/cli@latest hooks worker dispatch --trigger audit
```

## Agents

**Core**: `coder`, `reviewer`, `tester`, `planner`, `researcher`
**Architecture**: `system-architect`, `backend-dev`, `mobile-dev`
**Security**: `security-architect`, `security-auditor`
**Performance**: `performance-engineer`, `perf-analyzer`
**Coordination**: `hierarchical-coordinator`, `mesh-coordinator`, `adaptive-coordinator`
**GitHub**: `pr-manager`, `code-review-swarm`, `issue-tracker`, `release-manager`

Any string works as a custom agent type.

## Build & Test

- ALWAYS run tests after code changes
- ALWAYS verify build succeeds before committing

```bash
npm run build && npm test
```

## CLI Quick Reference

```bash
npx @claude-flow/cli@latest init --wizard           # Setup
npx @claude-flow/cli@latest swarm init --v3-mode     # Start swarm
npx @claude-flow/cli@latest memory search --query "" # Vector search
npx @claude-flow/cli@latest hooks route --task ""    # Route to agent
npx @claude-flow/cli@latest doctor --fix             # Diagnostics
npx @claude-flow/cli@latest security scan            # Security scan
npx @claude-flow/cli@latest performance benchmark    # Benchmarks
```

26 commands, 140+ subcommands. Use `--help` on any command for details.

## Setup

```bash
claude mcp add claude-flow -- npx -y @claude-flow/cli@latest
npx @claude-flow/cli@latest daemon start
npx @claude-flow/cli@latest doctor --fix
```

**Agent tool** handles execution (agents, files, code, git). **MCP tools** handle coordination (swarm, memory, hooks). **CLI** is the same via Bash.
