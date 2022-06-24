"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_router_1 = __importDefault(require("./api/user.router"));
const product_router_1 = __importDefault(require("./api/product.router"));
const order_router_1 = __importDefault(require("./api/order.router"));
const router = (0, express_1.Router)();
router.use("/user", user_router_1.default);
router.use("/product", product_router_1.default);
router.use("/order", order_router_1.default);
exports.default = router;
