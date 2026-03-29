import { Request, Response } from 'express';
import { RemoveItemService } from '../../services/cart/RemoveItemService';

class RemoveItemController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const cart_item_id = req.query.cart_item_id as string;

    const removeItemService = new RemoveItemService();

    const itemDeletado = await removeItemService.execute({
      user_id,
      cart_item_id
    });

    return res.json(itemDeletado);
  }
}

export { RemoveItemController };
