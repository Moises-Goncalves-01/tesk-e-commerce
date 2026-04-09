import prismaClient from '../../prisma';

interface UpdateStatusRequest {
  order_id: string;
  status: 'PENDING' | 'PAID' | 'CANCELED';
}

class UpdateStatusOrderService {
  async execute({ order_id, status }: UpdateStatusRequest) {
    if (!order_id || !status) {
      throw new Error('ID do pedido e o novo status são obrigatórios');
    }

    const validStatuses = ['PENDING', 'PAID', 'CANCELED'];
    if (!validStatuses.includes(status)) {
      throw new Error('Status inválido. Use: PENDING, PAID ou CANCELED');
    }

    const orderExists = await prismaClient.order.findUnique({
      where: { id: order_id },
      include: {
        orderItems: true
      }
    });

    if (!orderExists) {
      throw new Error('Pedido não encontrado');
    }

    // Se o pedido está sendo CANCELADO e ele já não estava cancelado antes
    if (status === 'CANCELED' && orderExists.status !== 'CANCELED') {
      const updatedOrder = await prismaClient.$transaction(async (prisma: any) => {
        // Devolve o estoque de cada item do pedido
        for (const item of orderExists.orderItems) {
          await prisma.product.update({
            where: { id: item.product_id },
            data: {
              estoque: {
                increment: item.quantidade
              }
            }
          });
        }

        // Atualiza o status
        return await prisma.order.update({
          where: { id: order_id },
          data: { status }
        });
      });

      return updatedOrder;
    }

    // Se não for cancelamento, atualiza o status normalmente
    const updatedOrder = await prismaClient.order.update({
      where: { id: order_id },
      data: { status: status }
    });

    return updatedOrder;
  }
}

export { UpdateStatusOrderService };
