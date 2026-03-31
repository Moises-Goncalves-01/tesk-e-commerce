<p align="center">
  <h1 align="center">🖥️ Tech Store</h1>
  <p align="center">
    E-commerce completo de hardware e tecnologia — Backend Node.js + Frontend React
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

---

## 📖 Sobre o Projeto

**Tech Store** é uma aplicação web fullstack de e-commerce voltada para produtos de tecnologia (hardware, periféricos, notebooks, etc). O projeto conta com:

- **API RESTful** completa com autenticação JWT, controle de acesso por roles (Admin / Customer) e upload de imagens via Supabase Storage
- **Frontend responsivo** com design **Dark Mode Premium**, painel administrativo e interface de loja
- **Banco de dados relacional** PostgreSQL gerenciado pelo Prisma ORM

---

## 🏗️ Arquitetura do Projeto

```
tech-store/
├── backend/             # API Node.js + Express + Prisma
│   ├── prisma/          # Schema do banco e seed
│   ├── postman/         # Collection do Postman para testes
│   └── src/
│       ├── config/      # Configurações (Multer, etc.)
│       ├── controllers/ # Controllers organizados por domínio
│       ├── middlewares/  # Autenticação e autorização
│       ├── services/    # Regras de negócio
│       ├── utils/       # Utilitários (Supabase Client)
│       ├── routes.ts    # Definição de todas as rotas
│       └── server.ts    # Entrada da aplicação
│
├── frontend/            # React + Vite + TypeScript
│   └── src/
│       ├── components/  # Componentes reutilizáveis (Navbar, AdminLayout)
│       ├── contexts/    # Gerenciamento de estado (AuthContext)
│       ├── pages/       # Páginas organizadas por domínio
│       ├── routes/      # Configuração de rotas (React Router)
│       ├── services/    # Configuração do Axios (API Client)
│       └── index.css    # Design System (Dark Mode Premium)
│
└── README.md            # Este arquivo
```

---

## 🚀 Tecnologias Utilizadas

### Backend
| Tecnologia | Função |
|---|---|
| **Node.js** | Runtime JavaScript no servidor |
| **Express** | Framework HTTP leve e flexível |
| **TypeScript** | Tipagem estática para segurança |
| **Prisma ORM** | Mapeamento e migração do banco de dados |
| **PostgreSQL** | Banco de dados relacional (via Supabase) |
| **JWT (jsonwebtoken)** | Autenticação via token |
| **Bcrypt** | Hash seguro de senhas |
| **Multer** | Upload de arquivos (multipart/form-data) |
| **Supabase Storage** | Armazenamento de imagens na nuvem |
| **Zod** | Validação de dados |
| **Helmet** | Headers de segurança HTTP |
| **Morgan** | Logs de requisições HTTP |

### Frontend
| Tecnologia | Função |
|---|---|
| **React 19** | Biblioteca para construção de interfaces |
| **Vite** | Build tool ultra rápido |
| **TypeScript** | Tipagem estática |
| **React Router DOM** | Navegação SPA |
| **Axios** | Cliente HTTP para consumir a API |
| **Lucide React** | Ícones modernos e leves |
| **CSS Vanilla** | Estilização completa sem frameworks |

---

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org) (v18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Uma conta no [Supabase](https://supabase.com) (para banco de dados PostgreSQL e Storage)

---

## ⚙️ Instalação e Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/tech-store.git
cd tech-store
```

### 2. Configure o Backend

```bash
cd backend
npm install
```

Crie o arquivo `.env` na raiz da pasta `backend/`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
PORT=3333
JWT_SECRET="sua_chave_secreta_aqui"

SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_KEY="sua_anon_key_aqui"
```

Execute as migrações do banco de dados:

```bash
npx prisma migrate dev
```

Execute o seed para criar o usuário administrador:

```bash
npm run seed
```

> 🔑 **Credenciais do Admin Master:**
> - Email: `admin@techstore.com`
> - Senha: `admin123`

### 3. Configure o Frontend

```bash
cd ../frontend
npm install
```

### 4. Configure o Supabase Storage (Upload de Imagens)

Para que o upload de imagens funcione corretamente:

1. Acesse o painel do Supabase: [app.supabase.com](https://app.supabase.com)
2. Navegue até **Storage** → **New Bucket**
3. Crie um bucket com nome `images`
4. Marque como **Public**
5. Pronto! As imagens dos produtos serão armazenadas lá

---

## ▶️ Executando o Projeto

### Backend (Terminal 1)

```bash
cd backend
npm run dev
```

> Servidor rodando em `http://localhost:3333`

### Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

> Aplicação rodando em `http://localhost:5173`

---

## 🔐 Autenticação e Roles

O sistema possui dois tipos de usuários:

| Role | Permissões |
|---|---|
| **CUSTOMER** | Navegar na loja, adicionar ao carrinho, fazer pedidos, escrever reviews |
| **ADMIN** | Tudo do Customer + criar categorias, criar produtos, gerenciar pedidos |

O token JWT é enviado no header `Authorization: Bearer <token>` em todas as requisições autenticadas.

---

## 📡 Endpoints da API

### 🔓 Rotas Públicas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Health check da API |
| `POST` | `/users` | Cadastro de novo usuário |
| `POST` | `/session` | Login (retorna token JWT) |
| `GET` | `/category` | Listar categorias |
| `GET` | `/product` | Listar produtos (com filtros e paginação) |
| `GET` | `/review` | Listar reviews por produto |

### 🔒 Rotas Autenticadas (Token obrigatório)

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/me` | Detalhes do usuário logado |
| `POST` | `/cart` | Adicionar item ao carrinho |
| `GET` | `/cart` | Listar itens do carrinho |
| `DELETE` | `/cart` | Remover item do carrinho |
| `POST` | `/order` | Criar pedido (checkout) |
| `GET` | `/order` | Listar pedidos do usuário |
| `POST` | `/review` | Criar avaliação de produto |

### 🛡️ Rotas de Admin (Token + Role ADMIN)

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/category` | Criar nova categoria |
| `POST` | `/product` | Criar produto (com upload de imagem) |
| `GET` | `/admin/orders` | Listar todos os pedidos |
| `PUT` | `/admin/orders/status` | Alterar status de um pedido |

### Detalhes dos Payloads

<details>
<summary><strong>POST /users</strong> — Cadastro</summary>

```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```
</details>

<details>
<summary><strong>POST /session</strong> — Login</summary>

```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "id": "uuid",
  "nome": "João Silva",
  "email": "joao@email.com",
  "role": "CUSTOMER",
  "token": "eyJhbGciOi..."
}
```
</details>

<details>
<summary><strong>POST /product</strong> — Criar Produto (multipart/form-data)</summary>

| Campo | Tipo | Obrigatório |
|---|---|---|
| `nome` | string | ✅ |
| `descricao` | string | ✅ |
| `preco` | number | ✅ |
| `estoque` | number | ❌ (default: 0) |
| `categoria_id` | string (UUID) | ✅ |
| `file` | File (imagem) | ❌ |

</details>

<details>
<summary><strong>PUT /admin/orders/status</strong> — Alterar Status</summary>

```json
{
  "order_id": "uuid-do-pedido",
  "status": "PAID"
}
```

Status válidos: `PENDING`, `PAID`, `CANCELED`
</details>

---

## 🎨 Design do Frontend

O frontend utiliza o tema **Dark Mode Premium** com:

- 🌑 Fundos escuros (quase pretos) com glassmorphism sutil
- 💎 Detalhes em azul neon (`#3B82F6`) e roxo (`#8B5CF6`)
- 🔤 Tipografia Inter (Google Fonts)
- 📱 Layout totalmente responsivo (Mobile-First)
- ✨ Animações suaves de transição e fade-in

### Páginas Implementadas

| Página | Rota | Status |
|---|---|---|
| Login | `/login` | ✅ Funcional |
| Painel Admin - Dashboard | `/admin` | ✅ Funcional |
| Painel Admin - Produtos | `/admin/products` | ✅ Funcional |
| Painel Admin - Categorias | `/admin/categories` | ✅ Funcional |
| Painel Admin - Pedidos | `/admin/orders` | ✅ Funcional |
| Home (Vitrine) | `/` | 🔨 Em construção |

---

## 🗄️ Modelos do Banco de Dados

```mermaid
erDiagram
    User ||--o{ Review : writes
    User ||--o{ CartItem : has
    User ||--o{ Order : places
    
    Category ||--o{ Product : contains
    
    Product ||--o{ Review : receives
    Product ||--o{ CartItem : in_cart
    Product ||--o{ OrderItem : ordered
    
    Order ||--o{ OrderItem : includes

    User {
        string id PK
        string nome
        string email UK
        string senha
        enum role
        datetime created_at
    }

    Category {
        string id PK
        string nome
        string slug UK
    }

    Product {
        string id PK
        string nome
        string descricao
        float preco
        string imagem_url
        int estoque
        boolean destaque
        string categoria_id FK
    }

    Order {
        string id PK
        string user_id FK
        enum status
        float total
        datetime created_at
    }

    OrderItem {
        string id PK
        string order_id FK
        string product_id FK
        int quantidade
        float preco_unitario
    }
```

---

## 🧪 Testando a API

O projeto inclui uma collection completa do **Postman** pronta para uso:

📁 Arquivo: `backend/postman/Tech_Store_API.postman_collection.json`

Para usar:
1. Abra o Postman
2. Vá em **Import** → selecione o arquivo JSON
3. Configure a variável de ambiente `baseUrl` para `http://localhost:3333`
4. Execute as requisições na ordem (Auth → Categories → Products → Cart → Orders)

> Os scripts automáticos da collection salvam o token e IDs necessários nas variáveis.

---

## 📂 Scripts Disponíveis

### Backend

| Script | Comando | Descrição |
|---|---|---|
| dev | `npm run dev` | Inicia em modo desenvolvimento (hot-reload) |
| build | `npm run build` | Compila TypeScript para JavaScript |
| start | `npm run start` | Inicia servidor compilado (produção) |
| seed | `npm run seed` | Popula o banco com dados iniciais (admin) |

### Frontend

| Script | Comando | Descrição |
|---|---|---|
| dev | `npm run dev` | Inicia o Vite dev server |
| build | `npm run build` | Gera build de produção |
| preview | `npm run preview` | Preview do build de produção |
| lint | `npm run lint` | Verifica erros de código (ESLint) |

---

## 📄 Licença

Este projeto é de uso educacional e didático.

---

## 👨‍💻 Autor

Desenvolvido como projeto de aprendizado fullstack.

---

<p align="center">
  Feito com ❤️ usando Node.js, React e muito café ☕
</p>
