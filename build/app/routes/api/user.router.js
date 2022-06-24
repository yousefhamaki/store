"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../../controller/UserController"));
const ValidateToken_middleware_1 = __importDefault(require("../../middleware/ValidateToken.middleware"));
const routes = (0, express_1.Router)();
const controller = new UserController_1.default();
routes.get("/", ValidateToken_middleware_1.default, controller.getAllUsers); //tested
routes.patch("/:id", ValidateToken_middleware_1.default, controller.getUser); //tested
routes.post("/create", controller.create); //tested
routes.post("/login", controller.login); //tested
routes.put("/change", ValidateToken_middleware_1.default, controller.updateuserinfo); //tested
routes.put("/change/:id", ValidateToken_middleware_1.default, controller.changePass); //tested
routes.delete("/delete/:id", ValidateToken_middleware_1.default, controller.deleteUser); //tested
exports.default = routes;
