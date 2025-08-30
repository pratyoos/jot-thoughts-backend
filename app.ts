import express from 'express';
import cors from 'cors';
import { env } from './config/env';

import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
const PORT = env.PORT || 3050;

app.use(cors({ 
  origin: process.env.FRONTEND_URL || 'https://jot-thoughts.vercel.app', 
  credentials: true 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Jot Thoughts Backend API is running!');
});


import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.routes';

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Error middleware should be after routes
app.use(errorMiddleware);

export default app;