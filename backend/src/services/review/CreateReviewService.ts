import prismaClient from '../../prisma';
import { z } from 'zod';

const createReviewSchema = z.object({
  rating: z.number().min(1, 'Nota deve ser no mínimo 1').max(5, 'Nota deve ser no máximo 5'),
  comentario: z.string().optional(),
  product_id: z.string()
});

interface ReviewRequest {
  user_id: string;
  product_id: string;
  rating: number;
  comentario?: string;
}

class CreateReviewService {
  async execute({ user_id, product_id, rating, comentario }: ReviewRequest) {
    createReviewSchema.parse({ rating, comentario, product_id });

    // Verifica se o usuário logado está avaliando algo pela segunda vez
    const alreadyReviewed = await prismaClient.review.findFirst({
      where: {
        user_id: user_id,
        product_id: product_id
      }
    });

    if (alreadyReviewed) {
      throw new Error('Você já avaliou este produto. Obrigado!');
    }

    // Cria a avaliação (Review)
    const review = await prismaClient.review.create({
      data: {
        user_id: user_id,
        product_id: product_id,
        rating: rating,
        comentario: comentario
      }
    });

    return review;
  }
}

export { CreateReviewService };
