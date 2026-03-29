import { Request, Response } from 'express';
import { CreateReviewService } from '../../services/review/CreateReviewService';

class CreateReviewController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const { product_id, rating, comentario } = req.body;

    const createReviewService = new CreateReviewService();

    const review = await createReviewService.execute({
      user_id,
      product_id,
      rating: Number(rating),
      comentario
    });

    return res.json(review);
  }
}

export { CreateReviewController };
