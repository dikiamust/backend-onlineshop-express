"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
// import {socketInit} from './utils/socket_io.txt'
const PORT = parseInt(process.env.PORT) || 2200;
const mainServer = app_1.default.listen(PORT, () => {
    console.log(`app is running on http://localhost:${PORT}`);
});
// socketInit(mainServer)
