# 🔧 Tech Store — Backend API

API RESTful para o e-commerce Tech Store, construída com Node.js, Express, Prisma e PostgreSQL.

## Início Rápido

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# Rodar migrações
npx prisma migrate dev

# Criar admin master
npm run seed

# Iniciar servidor
npm run dev
```

> 🚀 Servidor disponível em `http://localhost:3333`

## Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | URL do PostgreSQL | `postgresql://user:pass@host:5432/db` |
| `PORT` | Porta do servidor | `3333` |
| `JWT_SECRET` | Chave secreta do JWT | `minha_chave_secreta` |
| `SUPABASE_URL` | URL do projeto Supabase | `https://xxx.supabase.co` |
| `SUPABASE_KEY` | Chave anon do Supabase | `eyJhbGciOi...` |

## Estrutura de Pastas

```
src/
├── config/           # Multer (upload)
├── controllers/      # Camada HTTP
│   ├── user/         # Auth e cadastro
│   ├── category/     # CRUD categorias
│   ├── product/      # CRUD produtos
│   ├── cart/         # Carrinho de compras
│   ├── order/        # Pedidos e checkout
│   └── review/       # Avaliações
├── middlewares/       # isAuthenticated, isAdmin
├── services/         # Regras de negócio
├── utils/            # Supabase Client
├── routes.ts         # Mapa de rotas
└── server.ts         # Ponto de entrada
```

## Dados Iniciais (Seed)

O comando `npm run seed` cria:

| Campo | Valor |
|---|---|
| Nome | Administrador Mestre |
| Email | `admin@techstore.com` |
| Senha | `admin123` |
| Role | `ADMIN` |

## Endpoints Resumidos

- `POST /users` — Cadastro
- `POST /session` — Login
- `GET /me` — Detalhes do usuário
- `POST /category` — Criar categoria (Admin)
- `GET /category` — Listar categorias
- `POST /product` — Criar produto com imagem (Admin)
- `GET /product` — Listar produtos
- `POST /cart` — Adicionar ao carrinho
- `GET /cart` — Listar carrinho
- `DELETE /cart` — Remover do carrinho
- `POST /order` — Checkout
- `GET /order` — Histórico de pedidos
- `GET /admin/orders` — Todos os pedidos (Admin)
- `PUT /admin/orders/status` — Alterar status (Admin)
- `POST /review` — Criar review
- `GET /review` — Listar reviews

> 📌 Documentação completa dos payloads no [README principal](../README.md).
