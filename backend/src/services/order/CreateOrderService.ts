import prismaClient from '../../prisma';

class CreateOrderService {
  async execute(user_id: string) {
    // 1. Buscar todos os itens no carrinho do usuário
    const cartItems = await prismaClient.cartItem.findMany({
      where: {
        user_id: user_id
      },
      include: {
        product: true
      }
    });

    if (cartItems.length === 0) {
      throw new Error('Seu carrinho está vazio.');
    }

    // 2. Calcular o valor total do pedido
    let total = 0;
    for (const item of cartItems) {
      total += item.product.preco * item.quantidade;
    }

    // Vamos usar uma Transação (Transaction) para garantir que
    // se der erro numa parte, tudo é cancelado.
    const order = await prismaClient.$transaction(async (prisma: any) => {
      // 3. Criar a Ordem / Pedido
      const newOrder = await prisma.order.create({
        data: {
          user_id: user_id,
          total: total,
          // status já tem default "PENDING"
        }
      });

      // 4. Inserir os Itens do Pedido (OrderItems) copiados do CartItem
      const orderItemsToInsert = cartItems.map((item: any) => {
        return {
          order_id: newOrder.id,
          product_id: item.product_id,
          quantidade: item.quantidade,
          preco_unitario: item.product.preco
        };
      });

      await prisma.orderItem.createMany({
        data: orderItemsToInsert
      });

      // 5. Limpar o carrinho do usuário
      await prisma.cartItem.deleteMany({
        where: {
          user_id: user_id
        }
      });

      return newOrder;
    });

    return order;
  }
}

export { CreateOrderService };
