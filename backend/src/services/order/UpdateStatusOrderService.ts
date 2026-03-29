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
      where: { id: order_id }
    });

    if (!orderExists) {
      throw new Error('Pedido não encontrado');
    }

    const updatedOrder = await prismaClient.order.update({
      where: { id: order_id },
      data: { status: status }
    });

    return updatedOrder;
  }
}

export { UpdateStatusOrderService };
