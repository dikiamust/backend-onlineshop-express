"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter_1 = __importDefault(require("./userRouter"));
const productRouter_1 = __importDefault(require("./productRouter"));
const orderRouter_1 = __importDefault(require("./orderRouter"));
const authMiddlewares_1 = __importDefault(require("../middlewares/authMiddlewares"));
const errorHandler_1 = __importDefault(require("../middlewares/errorHandler"));
class Routes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
        this.product();
        this.user();
        this.auth();
        this.order();
        this.errorHandler();
    }
    routes() {
        this.router.get("/", (req, res) => {
            res.status(200).json({ message: "Onlineshop API is running!" });
        });
    }
    product() {
        this.router.use(productRouter_1.default);
    }
    user() {
        this.router.use(userRouter_1.default);
    }
    auth() {
        this.router.use(authMiddlewares_1.default.authentication);
    }
    order() {
        this.router.use(orderRouter_1.default);
    }
    errorHandler() {
        this.router.use(errorHandler_1.default);
    }
}
exports.default = new Routes().router;
