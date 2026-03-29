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

    let imagem_url = null;

    if (file) {
      // Cria um nome de arquivo único
      const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;

      // Upload do buffer para o Supabase Storage (supondo que criamos um bucket chamado 'images')
      const { data, error } = await supabase.storage
        .from('images')
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (error) {
        throw new Error(`Falha no upload da imagem: ${error.message}`);
      }

      // Constrói a URL pública baseada no nome do arquivo salvo
      // Substitua process.env.SUPABASE_URL se necessário, ou pegue via getPublicUrl
      const publicUrl = supabase.storage
        .from('images')
        .getPublicUrl(fileName);

      imagem_url = publicUrl.data.publicUrl;
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
