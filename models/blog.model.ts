import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IBlog extends Document {
  _id: Types.ObjectId;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const blogSchema: Schema<IBlog> = new Schema(
  {
    title: { 
      type: String, 
      required: true, 
      trim: true 
    },
    summary: { 
      type: String, 
      required: true, 
      trim: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    imageUrl: { 
      type: String, 
      default: '' 
    },
    category: { 
      type: String, 
      default: 'general' 
    },
    author: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
  },
  { timestamps: true }
);

const Blog: Model<IBlog> = (mongoose.models.Blog as Model<IBlog>) || mongoose.model<IBlog>('Blog', blogSchema);
export default Blog;