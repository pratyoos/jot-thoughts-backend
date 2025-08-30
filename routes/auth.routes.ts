import express from 'express';
import { signup, login, profile } from '../controllers/auth.controller';
import { isAuthenticated } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', isAuthenticated, profile);

export default router;