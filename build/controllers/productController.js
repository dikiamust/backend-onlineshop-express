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
const ProductModel_1 = require("../models/ProductModel");
class ProductController {
    static createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, stock, imageUrl, description } = req.body;
                if (!name || !price || !stock || !imageUrl || !description) {
                    throw { name: "REQUIRED" };
                }
                if (price < 0 || stock < 0) {
                    throw { name: "INVALID_INPUT" };
                }
                const createProduct = yield ProductModel_1.Product.create({
                    name,
                    price,
                    stock,
                    imageUrl,
                    description
                });
                res.status(201).json({
                    success: true,
                    message: "Product was created successfully!",
                    data: createProduct,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static detailProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const searchProduct = yield ProductModel_1.Product.findById(productId);
                if (!searchProduct) {
                    throw { name: "NOT_FOUND" };
                }
                else {
                    res.status(200).json({
                        success: true,
                        message: "Product found",
                        data: searchProduct,
                    });
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static editProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, stock, imageUrl, description } = req.body;
                const { productId } = req.params;
                for (const key in req.body) {
                    if (!req.body[key]) {
                        delete req.body[key];
                    }
                }
                const edit = yield ProductModel_1.Product.findByIdAndUpdate(productId, req.body, { new: true });
                if (edit === null) {
                    throw { name: "PRODUCT_NOT_FOUND" };
                }
                res.status(200).json({
                    success: true,
                    message: "successfully updated this product",
                    data: edit,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const deleteProduct = yield ProductModel_1.Product.findByIdAndDelete(productId);
                if (deleteProduct === null) {
                    throw { name: "PRODUCT_NOT_FOUND" };
                }
                res.status(200).json({
                    success: true,
                    message: "success to delete this product",
                    data: deleteProduct,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    static findAllProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findAllProduct = yield ProductModel_1.Product.find();
                if (findAllProduct.length > 0) {
                    res.status(200).json({
                        success: true,
                        message: "All products have been displayed.",
                        totalProduct: findAllProduct.length,
                        data: findAllProduct,
                    });
                }
                else {
                    throw { name: "NOT_FOUND" };
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ProductController;
