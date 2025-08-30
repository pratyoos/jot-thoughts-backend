import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/users.model';
import { env } from '../config/env';

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const isAuthenticated = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ success: false, message: 'Not authenticated' });
      return;
    }

    const token = authHeader.split(' ')[1]!;
    const decoded: any = jwt.verify(token, env.JWT_SECRET!);

    if (!decoded.id) {
      res.status(401).json({ success: false, message: 'Invalid token payload' });
      return;
    }

    const user = await User.findById(decoded.id);
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }

    req.user = user;
    next();
    return;
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
    return;
  }
};
