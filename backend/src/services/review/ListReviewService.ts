import prismaClient from '../../prisma';

class ListReviewService {
  async execute(product_id: string) {
    if (!product_id) {
      throw new Error('ID do produto é obrigatório para listar as avaliações');
    }

    const reviews = await prismaClient.review.findMany({
      where: {
        product_id: product_id
      },
      include: {
        user: {
          select: {
            nome: true
          } // Não expomos email ou outros dados do autor da review, só o nome
        }
      }
    });

    return reviews;
  }
}

export { ListReviewService };
