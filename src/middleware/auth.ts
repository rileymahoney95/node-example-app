import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AppDataSource } from '../config/db/database';

export interface AuthRequest extends Request {
  user?: User;
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as { id: string };
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: decoded.id,
    });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};

export const adminAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await auth(req, res, () => {
      if (req.user?.isAdmin) {
        next();
      } else {
        throw new Error();
      }
    });
  } catch (error) {
    res.status(403).json({ error: 'Admin access required' });
  }
};
