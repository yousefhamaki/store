"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("./../../controller/order.controller"));
const ValidateToken_middleware_1 = __importDefault(require("../../middleware/ValidateToken.middleware"));
const routes = (0, express_1.Router)();
const controllers = new order_controller_1.default();
routes.get("/details/:id", ValidateToken_middleware_1.default, controllers.getOrder); //tested
routes.get("/me", ValidateToken_middleware_1.default, controllers.getUserOrders); //tested
routes.post("/create", ValidateToken_middleware_1.default, controllers.create); //tested
routes.put("/update", ValidateToken_middleware_1.default, controllers.updateOrder);
routes.delete("/delete/:id", ValidateToken_middleware_1.default, controllers.deleteOrder); //tested
exports.default = routes;
