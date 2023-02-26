"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddlewares_1 = __importDefault(require("../middlewares/authMiddlewares"));
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.route();
    }
    route() {
        this.router.post("/users/register", userController_1.default.register);
        this.router.post("/users/login", userController_1.default.login);
        this.router.use(authMiddlewares_1.default.authentication);
        this.router.put("/users/:userid", userController_1.default.editUser);
    }
}
exports.default = new UserRoute().router;
