import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

// Configuração para salvar as imagens localmente na pasta /tmp do backend
export const uploadConfig = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename: (req, file, cb) => {
      // Gera um hash para não ter arquivos com nomes iguais
      const fileHash = crypto.randomBytes(16).toString('hex');
      const fileName = `${fileHash}-${file.originalname.replace(/\s+/g, '-')}`;
      
      cb(null, fileName);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/webp'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo inválido. Apenas JPEG, PNG e WEBP são permitidos.'));
    }
  },
});
