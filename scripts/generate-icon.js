#!/usr/bin/env node
// Gera public/icon-1200x1200.png para o App Store da Shopify
// Conceito: fundo azul degradê, banner/faixa central, megafone + texto

import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SIZE = 1200;
const OUT = join(__dirname, '..', 'public', 'icon-1200x1200.png');

const svg = `
<svg width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Fundo: degradê azul vertical -->
    <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1E40AF"/>
      <stop offset="100%" stop-color="#2563EB"/>
    </linearGradient>

    <!-- Degradê do banner/faixa -->
    <linearGradient id="bannerGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1D4ED8" stop-opacity="0.85"/>
      <stop offset="50%" stop-color="#3B82F6" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#1D4ED8" stop-opacity="0.85"/>
    </linearGradient>

    <!-- Brilho do círculo âmbar -->
    <radialGradient id="amberGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FDE68A"/>
      <stop offset="100%" stop-color="#F59E0B"/>
    </radialGradient>

    <!-- Sombra suave para o círculo -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#00000055"/>
    </filter>

    <!-- Sombra leve para o banner -->
    <filter id="bannerShadow" x="-5%" y="-30%" width="110%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#00000040"/>
    </filter>
  </defs>

  <!-- Fundo sólido (sem transparência) -->
  <rect width="${SIZE}" height="${SIZE}" fill="url(#bgGrad)"/>

  <!-- Padrão decorativo: círculos sutis no fundo -->
  <circle cx="200" cy="200" r="160" fill="none" stroke="#FFFFFF0A" stroke-width="2"/>
  <circle cx="200" cy="200" r="280" fill="none" stroke="#FFFFFF07" stroke-width="2"/>
  <circle cx="1000" cy="1000" r="160" fill="none" stroke="#FFFFFF0A" stroke-width="2"/>
  <circle cx="1000" cy="1000" r="280" fill="none" stroke="#FFFFFF07" stroke-width="2"/>
  <circle cx="1100" cy="150" r="100" fill="none" stroke="#FFFFFF06" stroke-width="2"/>
  <circle cx="100" cy="1050" r="100" fill="none" stroke="#FFFFFF06" stroke-width="2"/>

  <!-- Linhas horizontais decorativas (representam banner/faixa) -->
  <rect x="0" y="520" width="${SIZE}" height="4" fill="#FFFFFF08"/>
  <rect x="0" y="680" width="${SIZE}" height="4" fill="#FFFFFF08"/>

  <!-- Faixa/banner central com sombra -->
  <rect x="80" y="530" width="1040" height="140" rx="20" ry="20"
        fill="url(#bannerGrad)" filter="url(#bannerShadow)"/>

  <!-- Texto "SMART ALERT" na faixa -->
  <text x="600" y="625"
        font-family="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
        font-size="72" font-weight="900" letter-spacing="8"
        text-anchor="middle" fill="#FFFFFF" opacity="0.95">
    SMART ALERT
  </text>

  <!-- Círculo âmbar (elemento de destaque) com sombra -->
  <circle cx="600" cy="340" r="200" fill="url(#amberGlow)" filter="url(#shadow)"/>

  <!-- Megafone — corpo principal -->
  <g transform="translate(600,340)">
    <!-- Corpo trapezoidal do megafone -->
    <polygon points="-80,-60 80,-90 80,90 -80,60"
             fill="#1E3A8A" stroke="#1E3A8A" stroke-width="4" stroke-linejoin="round"/>

    <!-- Bocal esquerdo do megafone (retângulo arredondado) -->
    <rect x="-130" y="-30" width="55" height="60" rx="12" ry="12"
          fill="#1E3A8A"/>
    <rect x="-134" y="-32" width="59" height="64" rx="14" ry="14"
          fill="none" stroke="#FFFFFF30" stroke-width="3"/>

    <!-- Campânula direita (forma de sino aberta) -->
    <path d="M80,-90 Q200,-120 200,0 Q200,120 80,90 Z"
          fill="#1E3A8A"/>
    <path d="M80,-90 Q200,-120 200,0 Q200,120 80,90"
          fill="none" stroke="#FFFFFF25" stroke-width="4"/>

    <!-- Borda da campânula -->
    <ellipse cx="200" cy="0" rx="18" ry="90"
             fill="#17307A"/>

    <!-- Anel decorativo na base da campânula -->
    <ellipse cx="82" cy="0" rx="8" ry="90"
             fill="#FFFFFF18"/>

    <!-- Pega/cabo inferior -->
    <rect x="-80" y="60" width="40" height="55" rx="8" ry="8"
          fill="#1E3A8A"/>

    <!-- Ondas de som (3 arcos à direita) -->
    <path d="M210,-40 Q240,0 210,40"
          fill="none" stroke="#1E3A8A" stroke-width="10" stroke-linecap="round"/>
    <path d="M230,-65 Q275,0 230,65"
          fill="none" stroke="#1E3A8A" stroke-width="9" stroke-linecap="round"
          opacity="0.8"/>
    <path d="M252,-88 Q310,0 252,88"
          fill="none" stroke="#1E3A8A" stroke-width="8" stroke-linecap="round"
          opacity="0.6"/>

    <!-- Brilho sutil no topo do megafone -->
    <ellipse cx="0" cy="-75" rx="55" ry="10"
             fill="#FFFFFF20" transform="rotate(-20)"/>
  </g>

  <!-- Ponto de exclamação âmbar (alerta) -->
  <circle cx="780" cy="220" r="38" fill="#F59E0B"/>
  <text x="780" y="238"
        font-family="'Arial Black', Arial, sans-serif"
        font-size="52" font-weight="900"
        text-anchor="middle" fill="#1E3A8A">!</text>

  <!-- Texto "Banner" abaixo da faixa -->
  <text x="600" y="760"
        font-family="'Arial', 'Helvetica Neue', sans-serif"
        font-size="44" font-weight="400" letter-spacing="16"
        text-anchor="middle" fill="#93C5FD" opacity="0.9">
    B A N N E R
  </text>

  <!-- Linha decorativa abaixo do subtítulo -->
  <line x1="420" y1="790" x2="780" y2="790"
        stroke="#60A5FA" stroke-width="2" opacity="0.5"/>

  <!-- Versão pequena "for Shopify" -->
  <text x="600" y="840"
        font-family="'Arial', 'Helvetica Neue', sans-serif"
        font-size="32" font-weight="300" letter-spacing="3"
        text-anchor="middle" fill="#BFDBFE" opacity="0.7">
    for Shopify
  </text>
</svg>
`.trim();

sharp(Buffer.from(svg))
  .png()
  .toFile(OUT)
  .then(info => {
    console.log(`✅ Ícone gerado: ${OUT}`);
    console.log(`   ${info.width}×${info.height}px — ${(info.size / 1024).toFixed(1)} KB`);
  })
  .catch(err => {
    console.error('❌ Erro ao gerar ícone:', err.message);
    process.exit(1);
  });
