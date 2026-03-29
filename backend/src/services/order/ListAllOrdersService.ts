import prismaClient from '../../prisma';

class ListAllOrdersService {
  async execute(page: number = 1) {
    const perPage = 20;
    const skip = (page - 1) * perPage;

    const [orders, totalCount] = await Promise.all([
      prismaClient.order.findMany({
        skip,
        take: perPage,
        orderBy: { created_at: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              nome: true,
              email: true
            }
          },
          orderItems: {
            include: {
              product: {
                select: {
                  nome: true,
                  imagem_url: true
                }
              }
            }
          }
        }
      }),
      prismaClient.order.count()
    ]);

    return {
      orders,
      page,
      perPage,
      totalCount,
      totalPages: Math.ceil(totalCount / perPage)
    };
  }
}

export { ListAllOrdersService };
