"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const EUserRole_1 = require("./enum/EUserRole");
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: false,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: EUserRole_1.EUserRole.CUSTOMER,
        enum: Object.values(EUserRole_1.EUserRole)
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email",
        },
    },
    password: {
        type: String,
        required: true,
    },
    shippingAddress: {
        type: String,
        required: false,
    },
}, { timestamps: true });
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
