import { Request, Response } from 'express';
import { UpdateStatusOrderService } from '../../services/order/UpdateStatusOrderService';

class UpdateStatusOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, status } = req.body;

    const updateStatusOrderService = new UpdateStatusOrderService();

    const order = await updateStatusOrderService.execute({
      order_id,
      status
    });

    return res.json(order);
  }
}

export { UpdateStatusOrderController };
