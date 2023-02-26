"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const OrderModel_1 = require("../models/OrderModel");
const ProductModel_1 = require("../models/ProductModel");
const ETypeOrder_1 = require("../models/enum/ETypeOrder");
class OrderController {
    static createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const UserId = req.UserId;
            const { productId, quantity, typeOrder } = req.body;
            try {
                const findProduct = yield ProductModel_1.Product.findById(productId);
                if (!findProduct) {
                    throw { name: "NOT_FOUND" };
                }
                // customers can only pre-order when the stock of product is zero 
                if (findProduct.stock <= 0 && typeOrder === ETypeOrder_1.ETypeOrder.PRE_ORDER) {
                    const createPreOrder = yield OrderModel_1.Order.create({
                        userId: UserId,
                        productId,
                        totalPrice: findProduct.price * quantity,
                        quantity,
                        typeOrder: ETypeOrder_1.ETypeOrder.PRE_ORDER
                    });
                    return res.status(201).json({
                        success: true,
                        message: "Pre-Order was created successfully!",
                        data: createPreOrder,
                    });
                }
                if (quantity > findProduct.stock || findProduct.stock <= 0) {
                    throw { name: "NO_STOCK" };
                }
                if (typeOrder !== ETypeOrder_1.ETypeOrder.PURCHASE_ORDER) {
                    throw { name: "PURCHASE_ORDER" };
                }
                const createPurchaseOrder = yield OrderModel_1.Order.create({
                    userId: UserId,
                    productId,
                    totalPrice: findProduct.price * quantity,
                    quantity,
                    typeOrder
                });
                const updateStock = yield ProductModel_1.Product.findByIdAndUpdate(productId, { $inc: { stock: -quantity } }, { new: true });
                return res.status(201).json({
                    success: true,
                    message: "Purchase Order was created successfully!",
                    data: createPurchaseOrder,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static findAllOrdersByUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const UserId = req.UserId;
                const findAllOrder = yield OrderModel_1.Order.find({ userId: UserId }).populate("productId");
                if (!findAllOrder) {
                    throw { name: "NOT_FOUND" };
                }
                res.status(200).json({
                    success: true,
                    message: "All orders successfully displayed.",
                    data: findAllOrder,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = OrderController;
