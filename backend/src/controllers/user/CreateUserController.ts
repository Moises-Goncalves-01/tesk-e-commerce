import { Request, Response } from 'express';
import { CreateUserService, CreateUserDTO } from '../../services/user/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { nome, email, senha }: CreateUserDTO = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      nome,
      email,
      senha
    });

    return res.status(201).json(user);
  }
}

export { CreateUserController };
