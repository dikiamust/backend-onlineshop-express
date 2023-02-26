"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = __importDefault(require("../controllers/orderController"));
const authMiddlewares_1 = __importDefault(require("../middlewares/authMiddlewares"));
class OrderRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.route();
    }
    route() {
        this.router.post("/orders/:userid", authMiddlewares_1.default.authorization, orderController_1.default.createOrder);
        this.router.get("/orders/:userid", authMiddlewares_1.default.authorization, orderController_1.default.findAllOrdersByUser);
    }
}
exports.default = new OrderRoute().router;
