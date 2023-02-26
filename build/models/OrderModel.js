"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ETypeOrder_1 = require("./enum/ETypeOrder");
const Schema = mongoose_1.default.Schema;
const orderSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    productId: { type: mongoose_1.default.Types.ObjectId, ref: "Product" },
    typeOrder: {
        type: String,
        required: true,
        enum: Object.values(ETypeOrder_1.ETypeOrder)
    },
    totalPrice: { type: Number },
}, { timestamps: true });
const Order = mongoose_1.default.model("Order", orderSchema);
exports.Order = Order;
