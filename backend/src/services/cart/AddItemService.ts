import prismaClient from '../../prisma';

interface AddItemRequest {
  user_id: string;
  product_id: string;
  quantidade: number;
}

class AddItemService {
  async execute({ user_id, product_id, quantidade }: AddItemRequest) {
    if (!product_id || quantidade <= 0) {
      throw new Error('Produto vazio ou quantidade inválida');
    }

    // Verifica se o produto existe
    const productExists = await prismaClient.product.findUnique({
      where: { id: product_id }
    });

    if (!productExists) {
      throw new Error('Produto não encontrado');
    }

    if (quantidade > productExists.estoque) {
      throw new Error('Quantidade solicitada excede o estoque disponível');
    }

    // Verifica se já está no carrinho
    const itemAlreadyInCart = await prismaClient.cartItem.findFirst({
      where: {
        user_id: user_id,
        product_id: product_id
      }
    });

    if (itemAlreadyInCart) {
      const novaQuantidade = itemAlreadyInCart.quantidade + quantidade;
      if (novaQuantidade > productExists.estoque) {
        throw new Error('Quantidade total no carrinho excede o estoque disponível');
      }

      // Já está no carrinho, apenas soma a quantidade
      const cartItem = await prismaClient.cartItem.update({
        where: { id: itemAlreadyInCart.id },
        data: {
          quantidade: itemAlreadyInCart.quantidade + quantidade
        }
      });
      return cartItem;
    }

    // Não está no carrinho, então cria um novo
    const cartItem = await prismaClient.cartItem.create({
      data: {
        user_id: user_id,
        product_id: product_id,
        quantidade: quantidade
      }
    });

    return cartItem;
  }
}

export { AddItemService };
