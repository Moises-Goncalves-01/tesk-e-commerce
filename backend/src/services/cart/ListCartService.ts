import prismaClient from '../../prisma';

class ListCartService {
  async execute(user_id: string) {
    const listCart = await prismaClient.cartItem.findMany({
      where: {
        user_id: user_id
      },
      include: {
        product: {
          select: {
            nome: true,
            preco: true,
            imagem_url: true
          }
        }
      }
    });

    return listCart;
  }
}

export { ListCartService };
