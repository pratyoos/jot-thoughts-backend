import express from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware';
import {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from '../controllers/blog.controller';

const router = express.Router();

router.route('/')
  .get(getAllBlogs)
  .post(isAuthenticated, createBlog);

router.route('/:id')
  .get(getBlog)
  .put(isAuthenticated, updateBlog)
  .delete(isAuthenticated, deleteBlog);

export default router;
