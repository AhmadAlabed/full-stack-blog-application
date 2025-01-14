import mongoose, { Document, Model, Schema } from "mongoose";
interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
}
const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
