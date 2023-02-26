"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = __importDefault(require("../controllers/productController"));
const authMiddlewares_1 = __importDefault(require("../middlewares/authMiddlewares"));
class ProductRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.route();
    }
    route() {
        this.router.get("/products", productController_1.default.findAllProduct);
        this.router.get("/products/:productId", productController_1.default.detailProduct);
        this.router.post("/products", authMiddlewares_1.default.adminAuthorization, productController_1.default.createProduct);
        this.router.put("/products/:productId", authMiddlewares_1.default.adminAuthorization, productController_1.default.editProduct);
        this.router.delete("/products/:productId", authMiddlewares_1.default.adminAuthorization, productController_1.default.deleteProduct);
    }
}
exports.default = new ProductRoute().router;
