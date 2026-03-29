import { Request, Response, NextFunction } from 'express';
import prismaClient from '../prisma';

export async function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user_id = req.user_id;

  if (!user_id) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }

  try {
    const userRole = await prismaClient.user.findFirst({
      where: {
        id: user_id
      },
      select: {
        role: true
      }
    });

    if (userRole?.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Access Denied. Admins only.' });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ error: 'Error validating role' });
  }
}
