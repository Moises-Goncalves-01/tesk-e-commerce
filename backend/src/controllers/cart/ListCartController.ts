import { Request, Response } from 'express';
import { ListCartService } from '../../services/cart/ListCartService';

class ListCartController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const listCartService = new ListCartService();

    const cart = await listCartService.execute(user_id);

    return res.json(cart);
  }
}

export { ListCartController };
