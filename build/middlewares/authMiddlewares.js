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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../models/UserModel");
class AuthMiddlewares {
    static authentication(req, res, next) {
        try {
            const access_token = req.headers.access_token;
            if (!access_token) {
                throw { name: "MISSING_TOKEN" };
            }
            const key = process.env.SECRETKEY;
            jsonwebtoken_1.default.verify(access_token, key, (err, decoded) => {
                if (err) {
                    throw { name: "INVALID_TOKEN" };
                }
                req.UserId = decoded.id;
                req.UserRole = decoded.role;
                next();
            });
        }
        catch (error) {
            next(error);
        }
    }
    static authorization(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.userid;
                const UserId = req.UserId;
                const searchUser = yield UserModel_1.User.findById(UserId);
                if (searchUser.id.toString() !== id) {
                    throw { name: "INVALID_USER_ID" };
                }
                else {
                    next();
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static adminAuthorization(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const access_token = req.headers.access_token;
                if (!access_token) {
                    throw { name: "MISSING_TOKEN" };
                }
                const key = process.env.SECRETKEY;
                jsonwebtoken_1.default.verify(access_token, key, (err, decoded) => {
                    if (err) {
                        throw { name: "INVALID_TOKEN" };
                    }
                    req.UserRole = decoded.role;
                });
                const UserRole = req.UserRole;
                if (UserRole !== "admin") {
                    throw { name: "FORBIDDEN" };
                }
                else {
                    next();
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = AuthMiddlewares;
