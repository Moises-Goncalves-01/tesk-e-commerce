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
      try {
        // Cria um nome de arquivo único
        const fileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`;

        // Upload do buffer para o Supabase Storage (bucket 'images')
        const { data, error } = await supabase.storage
          .from('images')
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: false
          });

        if (error) {
          console.warn(`⚠️ Upload da imagem falhou (bucket pode não existir): ${error.message}`);
          // Não lança erro - cria produto sem imagem
        } else {
          // Constrói a URL pública
          const publicUrl = supabase.storage
            .from('images')
            .getPublicUrl(fileName);

          imagem_url = publicUrl.data.publicUrl;
        }
      } catch (uploadError: any) {
        console.warn(`⚠️ Erro no upload: ${uploadError.message}`);
        // Continua mesmo com erro no upload
      }
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
