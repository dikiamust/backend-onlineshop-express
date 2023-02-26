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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
class UserController {
    constructor() {
        dotenv_1.default.config();
    }
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, role, phone, email, password, shippingAddress } = req.body;
            try {
                if (!username || !role || !phone || !email || !password) {
                    throw { name: "REQUIRED" };
                }
                if (role === 'customer' && !shippingAddress) {
                    throw { name: "REQUIRED" };
                }
                const register = yield UserModel_1.User.create({
                    username,
                    role,
                    phone,
                    email,
                    password: bcryptjs_1.default.hashSync(password, 8),
                    shippingAddress
                });
                return res.status(201).json({
                    success: true,
                    message: `The user was successfully registered as a ${role}!`,
                    data: register,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('masuk');
            const { email, password } = req.body;
            try {
                const loginEmail = yield UserModel_1.User.findOne({ email });
                if (!loginEmail) {
                    throw { name: "FALSE_LOGIN" };
                }
                const loginPassword = bcryptjs_1.default.compareSync(password, loginEmail.password);
                if (!loginPassword) {
                    throw { name: "FALSE_LOGIN" };
                }
                else {
                    const key = process.env.SECRETKEY;
                    let token = jsonwebtoken_1.default.sign({ id: loginEmail.id, role: loginEmail.role }, key, {
                        expiresIn: "1h",
                    });
                    res.status(200).json({
                        message: "You have successfully logged in",
                        email: loginEmail.email,
                        role: loginEmail.role,
                        access_token: token,
                    });
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userid } = req.params;
                const { username, address, phone, email } = req.body;
                for (const key in req.body) {
                    if (!req.body[key]) {
                        delete req.body[key];
                    }
                }
                const edit = yield UserModel_1.User.findByIdAndUpdate(userid, req.body, { new: true });
                if (!edit) {
                    throw { name: "NOT_EDITED" };
                }
                res.status(200).json({
                    success: true,
                    message: "You have successfully updated your account",
                    data: edit,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = UserController;
