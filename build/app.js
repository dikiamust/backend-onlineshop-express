"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const db_1 = __importDefault(require("./configs/db"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.plugins();
        this.route();
        dotenv_1.default.config();
    }
    plugins() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        (0, db_1.default)();
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Expose-Headers", "Authorization");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
            next();
        });
    }
    route() {
        this.app.use(indexRouter_1.default);
    }
}
exports.default = new App().app;
