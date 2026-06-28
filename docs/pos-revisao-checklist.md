# Smart Alert Banner — Checklist Pós-Aprovação

Submetido para revisão: 2026-06-28
Prazo esperado de resposta: 1–5 dias úteis

---

## 1. Email de aprovação

**O que esperar:**
- Remetente: `noreply@shopify.com` ou `partners@shopify.com`
- Assunto: *"Your app has been approved"* ou *"Action required on your app submission"*
- Monitorar: `nelodecarvalho@gmail.com` (checar também a pasta de spam)

**Após receber o email de aprovação:**
- [ ] Confirmar no Partner Dashboard → App → Distribution que o status mudou para **Published**
- [ ] Anotar a URL pública do listing (formato: `apps.shopify.com/smart-alert-banner`)
- [ ] Verificar se o ícone, screenshots e descrição aparecem corretamente na página pública

**Se chegou pedido de ajustes (ver seção 7):**
- [ ] Ler o email com atenção — a Shopify detalha exatamente o que precisa mudar
- [ ] Responder/ajustar dentro de 5 dias úteis para não perder a posição na fila

---

## 2. Teste end-to-end — loja de desenvolvimento

Usar uma **development store** no Partner Dashboard (não uma loja real).

### OAuth / Instalação
- [ ] Acessar o link de instalação: `https://smart-alert-banner-production.up.railway.app`
- [ ] Clicar em **Install** → redireciona para o OAuth do Shopify
- [ ] Autorizar os escopos (`write_script_tags`, `read_script_tags`)
- [ ] Confirmar que redireciona para o dashboard do app sem erro
- [ ] Verificar no Railway Logs que uma sessão foi criada (sem erro 500)

### Criação de banner
- [ ] No dashboard: preencher texto, escolher estado (ex: CA), cor laranja
- [ ] Clicar em **Save settings** → mensagem de sucesso aparece
- [ ] Recarregar a página → configurações persistem (banco de dados OK)

### Exibição na loja
- [ ] Ir em Online Store → Themes → Customize → App Embeds
- [ ] Ativar **Smart Alert Banner** e salvar
- [ ] Abrir a loja com `?smart_banner_preview=1` → banner deve aparecer no topo
- [ ] Confirmar: posição fixed no topo, texto correto, cor correta, botão ✕ funciona
- [ ] Fechar o banner → recarregar página → banner não reaparece (sessionStorage OK)

### Billing / Trial
- [ ] No dashboard, clicar em **$9.99/month** → redireciona para página de billing do Shopify
- [ ] Confirmar que aparece "7-day free trial" na página de confirmação
- [ ] Aprovar o trial → redireciona de volta para o app
- [ ] Verificar que o banner de trial sumiu do dashboard (`hasSubscription: true`)
- [ ] Testar o mesmo fluxo para o plano anual ($99.99/year)

---

## 3. Monitoring — Railway

URL dos logs: Railway Dashboard → projeto `vibrant-rejoicing` → serviço `smart-alert-banner` → **Logs**

**Verificar após cada instalação de teste:**
- [ ] Nenhum erro 500 nos logs
- [ ] `prisma migrate deploy` rodou sem erro no startup
- [ ] Tempo de resposta do `/api/public/settings` abaixo de 500ms
- [ ] Rota `/health` retornando `{"ok":true}` (testar via curl ou browser)

**Monitoramento contínuo (primeiras 48h após publicação):**
- [ ] Checar logs de hora em hora no primeiro dia
- [ ] Configurar alerta de crash no Railway (Settings → Notifications)
- [ ] Verificar uso de memória e CPU no Railway → Metrics

**Comandos de verificação rápida:**
```bash
# Health check
curl https://smart-alert-banner-production.up.railway.app/health

# API pública (substituir pela sua dev store)
curl "https://smart-alert-banner-production.up.railway.app/api/public/settings?shop=minha-loja.myshopify.com"
```

---

## 4. Billing — validação completa

- [ ] Instalar o app em uma dev store → não tem assinatura → billing banner aparece
- [ ] Iniciar trial Monthly → página de billing Shopify mostra "$9.99/month after trial"
- [ ] Iniciar trial Annual → página mostra "$99.99/year after trial"
- [ ] Após aprovar o trial: `GET /api/billing` retorna `{"hasSubscription":true}`
- [ ] Verificar no Partner Dashboard → Financials que a transação de teste aparece
- [ ] Confirmar que `isTest: true` está sendo usado apenas em dev (não em produção)

**Atenção:** em produção (`NODE_ENV=production`), o `isTest` é `false` — cobranças são reais.
Nunca testar billing com loja real sem ser em modo test.

---

## 5. App Store listing público

Após aprovação:
- [ ] Acessar `apps.shopify.com/smart-alert-banner` e conferir:
  - [ ] Ícone aparece corretamente (sem corte, sem borda branca)
  - [ ] Screenshots na ordem correta (dashboard → storefront → preview)
  - [ ] Tagline legível e sem truncamento
  - [ ] Full description formatada (sem caracteres estranhos)
  - [ ] Preços exibidos: "From $9.99/month" ou similar
  - [ ] Botão **Add app** funcional
  - [ ] Link de Privacy Policy funcionando
- [ ] Testar o fluxo de instalação a partir do listing público (não do link direto)

---

## 6. Primeiros usuários — divulgação inicial

### Canais gratuitos imediatos
- [ ] **Reddit** — postar em r/shopify e r/ecommerce com foco no problema que resolve
  - Título sugerido: *"I built a free Shopify app that shows geo-targeted banners — only to customers in a specific US state"*
  - Incluir screenshot do banner na loja e link do listing
- [ ] **Shopify Community Forums** — seção "Apps and Partners" → apresentar o app
- [ ] **Twitter/X** — post com GIF ou screenshot mostrando o banner em ação
- [ ] **LinkedIn** — post de lançamento direcionado a donos de e-commerce

### Estratégia para primeiras instalações
- [ ] Oferecer 1 mês grátis para os primeiros 10 usuários (cupom via Partner Dashboard)
- [ ] Pedir feedback via email após instalação (reply ao email de boas-vindas)
- [ ] Montar 1–2 casos de uso reais com screenshots para usar como prova social
- [ ] Responder todos os reviews do App Store nas primeiras 48h

### Grupos e comunidades
- [ ] Facebook Groups: "Shopify Entrepreneurs", "Shopify Store Owners"
- [ ] Slack: Shopify Partners Slack, IndieHackers Slack
- [ ] IndieHackers.com → postar no feed e em grupos de e-commerce

---

## 7. Se a Shopify pedir ajustes

**Prazo para responder:** 5 dias úteis a partir do email (após isso, volta para o fim da fila).

**Ajustes mais comuns e como resolver:**

| Pedido da Shopify | O que fazer |
|---|---|
| Ícone com transparência ou tamanho errado | Rodar `node scripts/generate-icon.js` e reenviar |
| Screenshot não representa o app real | Rodar `node scripts/generate-screenshots.js` e ajustar o SVG |
| Descrição com claims não verificáveis | Remover superlatives ("best", "fastest") de `docs/appstore-listing.md` |
| Privacy Policy incompleta | Editar `app/routes/privacy.jsx` e fazer deploy |
| Funcionalidade não funcionando durante teste | Verificar logs no Railway, corrigir e notificar a Shopify pelo Partner Dashboard |
| Escopos solicitados além do necessário | Verificar `SCOPES` no Railway — deve ser só `write_script_tags,read_script_tags` |

**Como responder à Shopify:**
1. Corrigir o problema
2. No Partner Dashboard → App → Distribution → clicar em **Reply to review** ou **Resubmit**
3. Descrever brevemente o que foi corrigido
4. Resubmeter — volta para a fila (prazo adicional: 1–3 dias úteis)

---

## Referência rápida

| Item | Valor |
|---|---|
| App URL (produção) | https://smart-alert-banner-production.up.railway.app |
| Railway projeto | vibrant-rejoicing / smart-alert-banner |
| GitHub repo | nelodecarvalho-art/smart-alert-banner |
| Privacy Policy | https://smart-alert-banner-production.up.railway.app/privacy |
| Support email | nelodecarvalho@gmail.com |
| Shopify API Key | f60a7fca2f7d0164558da2fa611a6272 |
