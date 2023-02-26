import mongoose  from "mongoose";
import {ETypeOrder} from './enum/ETypeOrder'

const Schema = mongoose.Schema;

interface IOrder {
  userId: string;
  productId: string;
  typeOrder: string;
  quantity: number;
  totalPrice: number;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  productId: string;
  typeOrder: string;
  totalPrice: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attr: IOrder): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    productId: {type: mongoose.Types.ObjectId, ref: "Product"},
    typeOrder: {
      type: String,
      required: true,
      enum: Object.values(ETypeOrder)
    },
    totalPrice: {type: Number},
  },
  {timestamps: true}
);

const Order = mongoose.model<OrderDoc, OrderModel>("Order", orderSchema);

export {Order};
