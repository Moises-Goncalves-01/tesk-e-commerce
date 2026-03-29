import { Request, Response } from 'express';
import { ListProductService } from '../../services/product/ListProductService';

class ListProductController {
  async handle(req: Request, res: Response) {
    const categoria_id = req.query.categoria_id as string;
    const search = req.query.search as string;
    const page = req.query.page ? Number(req.query.page) : 1;
    const destaque = req.query.destaque === 'true' ? true : req.query.destaque === 'false' ? false : undefined;

    const listProductService = new ListProductService();

    const products = await listProductService.execute({
      categoria_id,
      search,
      page,
      destaque
    });

    return res.json(products);
  }
}

export { ListProductController };
