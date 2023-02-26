"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const productSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", productSchema);
exports.Product = Product;
