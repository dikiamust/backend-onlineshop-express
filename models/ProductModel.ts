import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IProduct {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
}

interface ProductDoc extends mongoose.Document {
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
  description: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attr: IProduct): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    name: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    imageUrl: {type: String, required: true},
    description: {type: String, required: true},
  },
  {timestamps: true}
);

const Product = mongoose.model<ProductDoc, ProductModel>(
  "Product",
  productSchema
);

export {Product};
