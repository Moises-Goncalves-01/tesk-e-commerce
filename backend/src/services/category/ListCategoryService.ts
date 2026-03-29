import prismaClient from '../../prisma';

class ListCategoryService {
  async execute() {
    const categories = await prismaClient.category.findMany({
      select: {
        id: true,
        nome: true,
        slug: true
      }
    });

    return categories;
  }
}

export { ListCategoryService };
