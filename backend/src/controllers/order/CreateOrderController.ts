import { Request, Response } from 'express';
import { CreateOrderService } from '../../services/order/CreateOrderService';

class CreateOrderController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute(user_id);

    return res.json(order);
  }
}

export { CreateOrderController };
