import prismaClient from '../../prisma';

interface ListProductRequest {
  categoria_id?: string;
  search?: string;
  page?: number;
  destaque?: boolean;
}

class ListProductService {
  async execute({ categoria_id, search, page = 1, destaque }: ListProductRequest) {
    const perPage = 12;
    const skip = (page - 1) * perPage;

    // Montar filtros dinamicamente
    const where: any = {};

    if (categoria_id) {
      where.categoria_id = categoria_id;
    }

    if (search) {
      where.nome = {
        contains: search,
        mode: 'insensitive'
      };
    }

    if (destaque !== undefined) {
      where.destaque = destaque;
    }

    const [products, totalCount] = await Promise.all([
      prismaClient.product.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { created_at: 'desc' },
        include: {
          categoria: {
            select: {
              nome: true,
              slug: true
            }
          }
        }
      }),
      prismaClient.product.count({ where })
    ]);

    return {
      products,
      page,
      perPage,
      totalCount,
      totalPages: Math.ceil(totalCount / perPage)
    };
  }
}

export { ListProductService };
