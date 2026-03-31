# 🎨 Tech Store — Frontend

Interface web do e-commerce Tech Store, construída com React, Vite e TypeScript.

## Início Rápido

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

> 🚀 Aplicação disponível em `http://localhost:5173`

## Design

O frontend usa o tema **Dark Mode Premium**:

- 🌑 Fundos escuros com glassmorphism sutil
- 💎 Detalhes em azul neon e roxo
- 🔤 Tipografia **Inter** (Google Fonts)
- 📱 Layout **totalmente responsivo** (Mobile-First)
- ✨ Micro-animações e transições suaves

## Estrutura de Pastas

```
src/
├── components/
│   └── layout/
│       ├── Navbar/         # Barra de navegação (cliente)
│       └── AdminLayout/    # Layout do painel admin (sidebar)
├── contexts/
│   └── AuthContext.tsx     # Gerenciamento de sessão/JWT
├── pages/
│   ├── Auth/
│   │   └── Login.tsx       # Página de login
│   └── Admin/
│       ├── Dashboard/      # Visão geral com estatísticas
│       ├── Products/       # CRUD de produtos + upload
│       ├── Categories/     # CRUD de categorias
│       └── Orders/         # Gestão de status de pedidos
├── routes/
│   └── index.tsx           # Rotas protegidas e públicas
├── services/
│   └── api.ts              # Configuração do Axios + interceptor JWT
└── index.css               # Design System (variáveis, classes globais)
```

## Páginas

| Rota | Página | Acesso |
|---|---|---|
| `/` | Home (Vitrine) | Público |
| `/login` | Login | Público |
| `/admin` | Dashboard Admin | Admin |
| `/admin/products` | Gestão de Produtos | Admin |
| `/admin/categories` | Gestão de Categorias | Admin |
| `/admin/orders` | Gestão de Pedidos | Admin |

## Conexão com o Backend

O frontend se comunica com a API via Axios. A configuração está em `src/services/api.ts`:

- **Base URL:** `http://localhost:3333`
- **Token JWT:** Adicionado automaticamente via interceptor (`@TechStore:token` no localStorage)

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot-reload |
| `npm run build` | Build de produção otimizado |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Verificação de código com ESLint |

> 📌 Documentação completa no [README principal](../README.md).
