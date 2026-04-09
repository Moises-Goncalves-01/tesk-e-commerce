import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false })); // Permite carregar as imagens de outras origens
app.use(morgan('dev'));

// Rota estática para acessar as imagens enviadas
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(router);

// Error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
