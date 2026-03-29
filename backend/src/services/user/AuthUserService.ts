import prismaClient from '../../prisma';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { z } from 'zod';

const authUserSchema = z.object({
  email: z.string().email('E-mail inválido'),
  senha: z.string().min(1, 'Senha é obrigatória')
});

export type AuthUserDTO = z.infer<typeof authUserSchema>;

class AuthUserService {
  async execute({ email, senha }: AuthUserDTO) {
    // 1. Validar entradas
    authUserSchema.parse({ email, senha });

    // 2. Verificar se o e-mail existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error('E-mail ou senha incorretos!');
    }

    // 3. Verificar se a senha está correta
    const passwordMatch = await compare(senha, user.senha);

    if (!passwordMatch) {
      throw new Error('E-mail ou senha incorretos!');
    }

    // 4. Se deu tudo certo, gerar o token JWT e retornar
    const token = sign(
      {
        nome: user.nome,
        email: user.email
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    );

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
      token: token
    };
  }
}

export { AuthUserService };
