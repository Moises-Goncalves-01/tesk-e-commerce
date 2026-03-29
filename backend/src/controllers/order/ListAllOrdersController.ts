import { Request, Response } from 'express';
import { ListAllOrdersService } from '../../services/order/ListAllOrdersService';

class ListAllOrdersController {
  async handle(req: Request, res: Response) {
    const page = req.query.page ? Number(req.query.page) : 1;

    const listAllOrdersService = new ListAllOrdersService();

    const orders = await listAllOrdersService.execute(page);

    return res.json(orders);
  }
}

export { ListAllOrdersController };
