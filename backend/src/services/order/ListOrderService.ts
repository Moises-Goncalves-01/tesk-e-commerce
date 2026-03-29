import prismaClient from '../../prisma';

class ListOrderService {
  async execute(user_id: string) {
    const orders = await prismaClient.order.findMany({
      where: {
        user_id: user_id
      },
      orderBy: {
        created_at: 'desc'
      },
      include: {
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
    });

    return orders;
  }
}

export { ListOrderService };
