import { Request, Response } from 'express';
import { AddItemService } from '../../services/cart/AddItemService';

class AddItemController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id; // Vindo do token
    const { product_id, quantidade } = req.body;

    const addItemService = new AddItemService();

    const cartItem = await addItemService.execute({
      user_id,
      product_id,
      quantidade: Number(quantidade)
    });

    return res.json(cartItem);
  }
}

export { AddItemController };
