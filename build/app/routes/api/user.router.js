"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../../controller/UserController"));
const routes = (0, express_1.Router)();
const controller = new UserController_1.default();
routes.get("/", controller.getAllUsers);
routes.get("/:id", controller.getUser);
routes.post("/create", controller.create);
routes.post("/login", controller.login);
routes.put("/change", controller.updateuserinfo);
routes.put("/change/:id", controller.changePass);
routes.delete("/delete/:id", controller.deleteUser);
exports.default = routes;
