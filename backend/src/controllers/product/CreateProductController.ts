import { Request, Response } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { nome, descricao, preco, estoque, categoria_id } = req.body;
    
    // O multer colocará o arquivo aqui se vier no FormData usando multipart/form-data
    const file = req.file;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      nome,
      descricao,
      preco: Number(preco),
      estoque: estoque ? Number(estoque) : 0,
      categoria_id,
      file
    });

    return res.json(product);
  }
}

export { CreateProductController };
