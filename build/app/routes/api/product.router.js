"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Product_controller_1 = __importDefault(require("./../../controller/Product.controller"));
const routes = (0, express_1.Router)();
const controller = new Product_controller_1.default();
routes.get("/", controller.getAll);
routes.get("/:id", controller.getProduct);
routes.post("/create", controller.create);
routes.put("/change", controller.updateProduct);
routes.delete("/delete/:id", controller.deleteProduct);
exports.default = routes;
