import prismaClient from '../../prisma';

interface RemoveItemRequest {
  user_id: string;
  cart_item_id: string;
}

class RemoveItemService {
  async execute({ user_id, cart_item_id }: RemoveItemRequest) {
    // Busca o item pra ter certeza de que pertence a quem está deletando
    const item = await prismaClient.cartItem.findFirst({
      where: {
        id: cart_item_id,
        user_id: user_id
      }
    });

    if (!item) {
      throw new Error('Item não encontrado ou você não tem permissão para deletá-lo');
    }

    const cartItem = await prismaClient.cartItem.delete({
      where: { id: cart_item_id }
    });

    return cartItem;
  }
}

export { RemoveItemService };
