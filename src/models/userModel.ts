import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  role: "admin" | "public" | "tourist";
  phone_number: string;
  profile_picture?: string;
  address: string;
}

const userSchema: Schema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    phone_number: { type: String, required: true },
    profile_picture: { type: String, default: "" },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);

