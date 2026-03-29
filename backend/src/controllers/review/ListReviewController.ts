import { Request, Response } from 'express';
import { ListReviewService } from '../../services/review/ListReviewService';

class ListReviewController {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string;

    const listReviewService = new ListReviewService();

    const reviews = await listReviewService.execute(product_id);

    return res.json(reviews);
  }
}

export { ListReviewController };
