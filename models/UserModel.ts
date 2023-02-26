import mongoose from "mongoose";
import {EUserRole} from "./enum/EUserRole"

interface IUser {
  username: string;
  role: string;
  phone: string;
  email: string;
  password: string;
  shippingAddress: string;
}

interface UserDoc extends mongoose.Document {
  username: string;
  role: string;
  phone: string;
  email: string;
  password: string;
  shippingAddress: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: false,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: EUserRole.CUSTOMER,
      enum: Object.values(EUserRole)
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (v: any) => {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: false,
    },
  },
  {timestamps: true}
);

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export {User};
