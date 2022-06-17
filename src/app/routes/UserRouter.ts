import express from "express";
import userController from "./../controller/UserController";

const Router = express.Router();

Router.post("/login", userController.login);

export default Router;
