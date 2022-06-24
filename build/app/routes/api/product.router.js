"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_controller_1 = __importDefault(require("./../../controller/Product.controller"));
const ValidateToken_middleware_1 = __importDefault(require("../../middleware/ValidateToken.middleware"));
const routes = (0, express_1.Router)();
const controller = new Product_controller_1.default();
routes.get("/", ValidateToken_middleware_1.default, controller.getAll); //tested
routes.get("/:id", ValidateToken_middleware_1.default, controller.getProduct); //tested
routes.post("/create", ValidateToken_middleware_1.default, controller.create); //tested
routes.put("/change", ValidateToken_middleware_1.default, controller.updateProduct); //tested
routes.delete("/delete/:id", ValidateToken_middleware_1.default, controller.deleteProduct); //tested
exports.default = routes;
