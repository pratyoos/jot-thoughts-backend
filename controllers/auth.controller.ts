import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import User from '../models/users.model';
import { generateToken } from '../utils/token';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: 'All fields are required' });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ success: false, message: 'Email already exists' });
      return;
    }

    const newUser = await User.create({ name, email, password });
    const token = generateToken(newUser._id.toString());

    res.status(200).json({
      success: true,
      message: 'Signup successful',
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }

  try {
    const foundUser = await User.findOne({ email }).select('+password');

    if (!foundUser) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const isMatch = await foundUser.matchPassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(foundUser._id.toString());

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
      },
      token,
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};

export const profile = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user?._id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
    return;
  } catch (err) {
    next(err);
    return;
  }
};