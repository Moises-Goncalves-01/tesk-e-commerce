import prismaClient from '../../prisma';
import { hash } from 'bcrypt';
import { z } from 'zod';

// We can use zod for validation here
const createUserSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;

class CreateUserService {
  async execute({ nome, email, senha }: CreateUserDTO) {
    // 1. Validar se recebemos os dados corretamente
    createUserSchema.parse({ nome, email, senha });

    // 2. Checar se já existe usuário com este e-mail
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email }
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    // 3. Fazer o hash da senha (nunca salvar plain-text)
    const passwordHash = await hash(senha, 8);

    // 4. Salvar no banco de dados e retornar ignorando a senha
    const user = await prismaClient.user.create({
      data: {
        nome,
        email,
        senha: passwordHash,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        created_at: true
      }
    });

    return user;
  }
}

export { CreateUserService };
