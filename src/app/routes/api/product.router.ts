import { Router } from "express";
import controllers from "./../../controller/Product.controller";
import Auth from "../../middleware/ValidateToken.middleware";

const routes = Router();
const controller = new controllers();

routes.get("/", controller.getAll); //tested
routes.get("/:id", controller.getProduct); //tested
routes.post("/create", Auth, controller.create); //tested

export default routes;
