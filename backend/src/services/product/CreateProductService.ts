import prismaClient from '../../prisma';
import { supabase } from '../../utils/supabaseClient';

interface ProductRequest {
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria_id: string;
  file?: Express.Multer.File;
}

class CreateProductService {
  async execute({ nome, descricao, preco, estoque, categoria_id, file }: ProductRequest) {
    if (!nome || !descricao || preco === undefined || !categoria_id) {
      throw new Error('Preencha os dados corretamente');
    }

    if (Number(preco) <= 0) {
      throw new Error('O preço deve ser maior que zero');
    }

    if (Number(estoque) < 0) {
      throw new Error('O estoque não pode ser negativo');
    }

    let imagem_url = null;

    if (file) {
      // Como o Multer (diskStorage) já salvou o arquivo, só precisamos pegar o nome
      // e construir a URL apontando para a nossa própria API (localhost:3333/files/...)
      const port = process.env.PORT || 3333;
      imagem_url = `http://localhost:${port}/files/${file.filename}`;
    }

    const product = await prismaClient.product.create({
      data: {
        nome,
        descricao,
        preco: Number(preco),
        estoque: Number(estoque),
        categoria_id,
        imagem_url: imagem_url
      }
    });

    return product;
  }
}

export { CreateProductService };
