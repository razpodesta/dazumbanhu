# 📱 Plataforma Digital "Dázum Banhu"

> **Elite Engineering & High Performance Commerce**

![Next.js](https://img.shields.io/badge/Next.js-15-black) ![Nx](https://img.shields.io/badge/Nx-Monorepo-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-cyan) ![Supabase](https://img.shields.io/badge/Supabase-Backend-green) ![Status](https://img.shields.io/badge/Status-Phase_1_Active-success)

---

## 🚀 Visão do Projeto

Este não é apenas um site. É uma **Plataforma de Experiência Digital (DXP)** projetada para transformar a **Dázum Banhu** na referência em tecnologia de veda de acessorios mobiles e assistência técnica em Florianópolis e no Brasil.

O projeto segue a filosofia **"Zero Latency"** e **"Mobile First"**. Abandonamos sites estáticos obsoletos em favor de uma aplicação viva, reativa e ultra-otimizada para conversão, integrando Inteligência Artificial, E-commerce Headless e um Sistema de Fidelidade proprietário.

---

## 🏢 Sobre a Dázum Banhu

**"Você merece!!!"**

Localizada no coração da Trindade (UFSC), especialistas apaixonados por entregar excelência.
*   **Localização:** R. Lauro Linhares, 2123 - Loja 10 (Florianópolis - SC).
*   **Foco:** Conserto especializado (15 min), Acessórios Premium e Eletrônicos.
*   **Credibilidade:** #1 em avaliações no Google na região (+670 reviews 5 estrelas).

---

## 🗺️ Roadmap de Desenvolvimento (Fases)

### 🏗️ Fase 0: A Fundação (Elite Engineering) ✅ *Concluída*
Estabelecimento de uma arquitetura de software de nível industrial.
*   **Monorepo Nx:** Orquestração de microsserviços e librarias modulares.
*   **Domain-Driven Design (DDD):** Separação estrita entre `Marketing`, `Catálogo`, `Fidelidade` e `Shared`.
*   **TypeScript Strict:** Erradicação total de `any`. Tipagem estática forte.
*   **Tailwind v4 (Alpha):** Adoção antecipada da nova geração de CSS "Zero Runtime".

### 🎨 Fase 1: A Vitrine Inteligente (Webpage de Ultra Conversão) 🚧 *Em Progresso*
Criação da experiência visual que guia o visitante pelo funil de vendas (Scrollytelling).
*   **Hero Section Cinematográfica:** Carruséis interativos controlados por gestos (`embla-carousel`).
*   **Smart WhatsApp Agent:** Um botão flutuante que entende o contexto (produto/suporte) e inicia conversas proativas.
*   **Asset Manifest:** Sistema centralizado de gestão de mídia para SEO e Performance (LCP < 1.2s).
*   **SEO Local Agressivo:** Otimização para "Conserto de Celular Florianópolis".

### 🧠 Fase 2: O Cérebro (Backend & Fidelidade)
Implementação da lógica de negócios e retenção de usuários.
*   **Supabase Integration:** Gestão de usuários, autenticação (Magic Link/Social) e Banco de Dados em tempo real.
*   **Sistema de Pontos (Loyalty):** Dashboard onde o cliente vê seus pontos, cupons de aniversário e recompensas.
*   **Segurança HMAC:** Assinatura digital de transações críticas entre Front e Back.

### 🛍️ Fase 3: A Loja (Commerce Headless)
A expansão para vendas online com infraestrutura robusta.
*   **Shopify Headless:** Usamos o Shopify apenas como PIM (Product Information Management) e Motor de Checkout.
*   **Next.js Frontend:** O cliente navega em nossa interface ultra-rápida, não no tema lento do Shopify.
*   **Mercado Pago Transparente:** Pagamento sem redirecionamentos, com cálculo de frete e parcelamento.
*   **Carrinho Inteligente (Zustand):** Persistência local e recuperação de carrinho abandonado.

### 📈 Fase 4: Expansão & Omni-channel
*   **Ads Integration:** Landing pages dedicadas para tráfego pago (Facebook/Google Ads).
*   **AI Analytics:** Monitoramento de comportamento para personalização de ofertas.

---

## 🛠️ Stack Tecnológico (O Arsenal)

### Frontend (The Face)
*   **Core:** [Next.js 15](https://nextjs.org/) (App Router, Server Actions).
*   **UI Library:** [React 19](https://react.dev/).
*   **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (CSS Variables, Native Performance).
*   **Animações:** `framer-motion` (Micro-interações, Page Transitions).
*   **Ícones:** `lucide-react` (Leveza vetorial).
*   **Carousel:** `embla-carousel-react` (Toque nativo mobile).

### Lógica & State (The Mind)
*   **State Management:** `zustand` (Gerenciamento global minimalista).
*   **Validação:** `zod` (Schemas estritos para formulários e APIs).
*   **Forms:** `react-hook-form` (Performance sem re-renders).

### Backend & Data (The Spine)
*   **Database/Auth:** [Supabase](https://supabase.com/) (PostgreSQL).
*   **E-commerce Engine:** [Shopify Storefront API](https://shopify.dev/docs/api/storefront) (GraphQL).
*   **Payments:** Mercado Pago SDK.
*   **Security:** `crypto-js` (HMAC-SHA256), `uuid`.

---

## 🧱 Arquitetura de Módulos (Lego Strategy)

O projeto não é monolítico. É composto por librarias independentes e reutilizáveis:

```text
mobile-store/
├── apps/
│   └── store-frontend      # A Aplicação Next.js (Orquestrador)
└── libs/
    ├── marketing/          # Domínio: Apresentação & Funil
    │   └── feature-home    # Landing Page Principal
    ├── catalogo/           # Domínio: E-commerce
    │   ├── data-access     # Lógica Shopify + Zustand Cart
    │   └── feature-products# UI de Listagem e Detalhes
    ├── fidelidade/         # Domínio: Retenção
    │   └── feature-panel   # Área do Usuário (Pontos)
    └── shared/             # Domínio: Compartilhado
        ├── ui-kit          # Design System (Botões, Inputs)
        ├── util-assets     # CMS Local & Manifesto de Mídia
        ├── util-security   # Criptografia & Schemas Zod
        └── util-supabase   # Cliente de Banco de Dados
```

🚦 Como Iniciar (Desenvolvimento)
Certifique-se de ter Node.js 20+ e pnpm instalados.

Instalar Dependências:

```Bash
pnpm install
```

Configurar Variáveis de Ambiente:
Crie um arquivo .env.local na raiz de apps/store-frontend com as chaves do Supabase e Shopify.
Rodar o Servidor de Desenvolvimento:

```Bash
pnpm dev
# ou
nx serve store-frontend
```

Acessar:
Abra http://localhost:4200 no seu navegador.

🧪 Comandos Úteis
Linting (Auditoria de Código): pnpm lint
Testes Unitários: pnpm test
Build de Produção: pnpm build:web
Verificar Tipagem: pnpm typecheck
"Tecnologia que move você."

© 2025 Raz Podestá - MetasShark Tech |
Desenvolvido com ❤️ e ☕ em Floripa, Software 100% de author.
