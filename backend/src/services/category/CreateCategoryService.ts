import prismaClient from '../../prisma';
import { z } from 'zod';

const createCategorySchema = z.object({
  nome: z.string().min(1, 'O nome da categoria é obrigatório')
});

class CreateCategoryService {
  async execute({ nome }: { nome: string }) {
    // Valida a entrada
    createCategorySchema.parse({ nome });

    // Gera o slug a partir do nome
    const slug = nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (slug === '') {
      throw new Error('Nome inválido para criar URL amigável');
    }

    // Checa se a categoria já existe
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        slug: slug
      }
    });

    if (categoryExists) {
      throw new Error('Essa categoria já foi registrada');
    }

    // Cria a categoria no banco de dados
    const category = await prismaClient.category.create({
      data: {
        nome: nome,
        slug: slug
      },
      select: {
        id: true,
        nome: true,
        slug: true
      }
    });

    return category;
  }
}

export { CreateCategoryService };
