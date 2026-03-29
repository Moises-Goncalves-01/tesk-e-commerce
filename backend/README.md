# 🖥️ Tech Store — Backend API

API RESTful para o e-commerce **Tech Store**, construída com **Node.js**, **Express**, **TypeScript**, **Prisma ORM** e **PostgreSQL** (Supabase).

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (v18+)
- npm
- Conta no [Supabase](https://supabase.com) (Banco PostgreSQL + Storage)

### Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
# Copie o .env.example ou crie um .env com:
DATABASE_URL="postgresql://usuario:senha@host:5432/banco"
PORT=3333
JWT_SECRET="sua_chave_secreta_aqui"
SUPABASE_URL="https://seu-projeto.supabase.co"
SUPABASE_KEY="sua_anon_ou_service_role_key"

# 3. Sincronizar banco de dados
npx prisma generate
npx prisma db push

# 4. Criar usuário Admin Master
npm run seed

# 5. Iniciar servidor de desenvolvimento
npm run dev
```

O servidor vai iniciar em `http://localhost:3333`.

---

## 📦 Estrutura de Pastas

```
src/
├── @types/express/     # Tipagens customizadas (req.user_id)
├── config/             # Configuração do Multer (upload)
├── controllers/        # Camada de entrada HTTP (MVC)
│   ├── cart/
│   ├── category/
│   ├── order/
│   ├── product/
│   ├── review/
│   └── user/
├── middlewares/         # isAuthenticated, isAdmin
├── prisma/             # Instância do PrismaClient
├── services/           # Regras de negócio (MVC)
│   ├── cart/
│   ├── category/
│   ├── order/
│   ├── product/
│   ├── review/
│   └── user/
├── utils/              # Supabase Client
├── routes.ts           # Definição de todas as rotas
└── server.ts           # Entry point do Express
```

---

## 🔐 Autenticação

A API usa **JWT (JSON Web Token)**. Para acessar rotas protegidas, envie o header:

```
Authorization: Bearer <seu_token_aqui>
```

### Credenciais do Admin (após seed)
- **Email:** `admin@techstore.com`
- **Senha:** `admin123`

---

## 📚 Rotas da API

### 🧑 Usuários / Auth

| Método | Rota       | Acesso   | Descrição                  |
|--------|------------|----------|----------------------------|
| POST   | `/users`   | Público  | Cadastrar novo usuário     |
| POST   | `/session` | Público  | Login (retorna token JWT)  |
| GET    | `/me`      | Privado  | Detalhes do usuário logado |

**POST /users** — Body (JSON):
```json
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456"
}
```

**POST /session** — Body (JSON):
```json
{
  "email": "joao@email.com",
  "senha": "123456"
}
```

---

### 📂 Categorias

| Método | Rota        | Acesso        | Descrição             |
|--------|-------------|---------------|-----------------------|
| POST   | `/category` | Admin         | Criar categoria       |
| GET    | `/category` | Público       | Listar categorias     |

**POST /category** — Body (JSON):
```json
{
  "nome": "Placas de Vídeo"
}
```
> O `slug` é gerado automaticamente (ex: `placas-de-video`).

---

### 🛍️ Produtos

| Método | Rota       | Acesso  | Descrição                              |
|--------|------------|---------|----------------------------------------|
| POST   | `/product` | Admin   | Criar produto (com upload de imagem)   |
| GET    | `/product` | Público | Listar produtos (com filtros)          |

**POST /product** — FormData (`multipart/form-data`):
| Campo         | Tipo   | Obrigatório |
|---------------|--------|-------------|
| `nome`        | text   | Sim         |
| `descricao`   | text   | Sim         |
| `preco`       | number | Sim         |
| `estoque`     | number | Não (default: 0) |
| `categoria_id`| text   | Sim         |
| `file`        | file   | Não         |

**GET /product** — Query Params:
| Param          | Tipo    | Descrição                          |
|----------------|---------|------------------------------------|
| `categoria_id` | string  | Filtrar por categoria              |
| `search`       | string  | Buscar por nome do produto         |
| `page`         | number  | Página (default: 1, 12 por página) |
| `destaque`     | boolean | Filtrar produtos em destaque       |

Exemplo: `GET /product?search=iphone&page=1&destaque=true`

---

### 🛒 Carrinho

| Método | Rota    | Acesso  | Descrição                     |
|--------|---------|---------|-------------------------------|
| POST   | `/cart` | Privado | Adicionar item ao carrinho    |
| DELETE | `/cart` | Privado | Remover item do carrinho      |
| GET    | `/cart` | Privado | Listar itens do carrinho      |

**POST /cart** — Body (JSON):
```json
{
  "product_id": "uuid-do-produto",
  "quantidade": 2
}
```

**DELETE /cart** — Query Param:
```
DELETE /cart?cart_item_id=uuid-do-item
```

---

### 📋 Pedidos (Checkout)

| Método | Rota     | Acesso  | Descrição                           |
|--------|----------|---------|-------------------------------------|
| POST   | `/order` | Privado | Finalizar compra (esvazia carrinho) |
| GET    | `/order` | Privado | Listar meus pedidos                 |

**POST /order** — Não precisa de body. Converte automaticamente o carrinho em pedido.

---

### 🔧 Pedidos (Admin)

| Método | Rota                    | Acesso | Descrição                      |
|--------|-------------------------|--------|--------------------------------|
| GET    | `/admin/orders`         | Admin  | Listar todos os pedidos        |
| PUT    | `/admin/orders/status`  | Admin  | Alterar status de um pedido    |

**GET /admin/orders** — Query Params:
| Param  | Tipo   | Descrição              |
|--------|--------|------------------------|
| `page` | number | Página (default: 1)    |

**PUT /admin/orders/status** — Body (JSON):
```json
{
  "order_id": "uuid-do-pedido",
  "status": "PAID"
}
```
> Status válidos: `PENDING`, `PAID`, `CANCELED`

---

### ⭐ Avaliações (Reviews)

| Método | Rota      | Acesso  | Descrição                          |
|--------|-----------|---------|------------------------------------|
| POST   | `/review` | Privado | Avaliar um produto (1 a 5 estrelas)|
| GET    | `/review` | Público | Listar avaliações de um produto    |

**POST /review** — Body (JSON):
```json
{
  "product_id": "uuid-do-produto",
  "rating": 5,
  "comentario": "Excelente produto!"
}
```

**GET /review** — Query Param:
```
GET /review?product_id=uuid-do-produto
```

---

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express** (HTTP Framework)
- **Prisma ORM** (Acesso ao banco PostgreSQL)
- **Supabase** (Banco PostgreSQL + Storage para imagens)
- **JWT** (Autenticação)
- **Bcrypt** (Hash de senhas)
- **Multer** (Upload de arquivos)
- **Zod** (Validação de dados)
- **Helmet** (Segurança HTTP)
- **Morgan** (Logs de requisição)
