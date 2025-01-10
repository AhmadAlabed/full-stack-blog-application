import mongoose, { Document, Model, Schema } from "mongoose";
interface IBlog extends Document {
  title: string;
  description: string;
  user: mongoose.Types.ObjectId;
}
const BlogSchema: Schema<IBlog> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
export default Blog;
