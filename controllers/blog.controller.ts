import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import Blog from '../models/blog.model';

// Create blog post
export const createBlog = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, summary, content, imageUrl, category } = req.body;

    if (!title || !summary || !content) {
      res.status(400).json({ success: false, message: 'Title, summary and content are required' });
      return;
    }

    const blog = await Blog.create({
      title,
      summary,
      content,
      imageUrl: imageUrl || '',
      category: category || 'general',
      author: req.user?._id
    });

    const populatedBlog = await blog.populate('author', 'name');

    res.status(201).json({
      success: true,
      data: populatedBlog
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};

// Get all blogs
export const getAllBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blogs = await Blog.find().populate('author', 'name').sort({ createdAt: -1 });

    res.json({
      success: true,
      data: blogs
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};

// Get single blog
export const getBlog = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'name');

    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    res.json({
      success: true,
      data: blog
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};

// Update blog
export const updateBlog = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { title, summary, content, imageUrl, category } = req.body;

    if (!title || !summary || !content) {
      res.status(400).json({ success: false, message: 'Title, summary and content are required' });
      return;
    }

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    if (blog.author.toString() !== req.user?._id.toString()) {
      res.status(403).json({ success: false, message: 'Not authorized' });
      return;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, summary, content, imageUrl, category },
      { new: true, runValidators: true }
    ).populate('author', 'name');

    res.json({
      success: true,
      data: updatedBlog
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};

// Delete blog
export const deleteBlog = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({ success: false, message: 'Blog not found' });
      return;
    }

    if (blog.author.toString() !== req.user?._id.toString()) {
      res.status(403).json({ success: false, message: 'Not authorized' });
      return;
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
    return;
  } catch (error) {
    next(error);
    return;
  }
};