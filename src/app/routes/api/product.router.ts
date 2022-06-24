import { Router } from "express";
import controllers from "./../../controller/Product.controller";
import Auth from "../../middleware/ValidateToken.middleware";

const routes = Router();
const controller = new controllers();

routes.get("/", Auth, controller.getAll); //tested
routes.get("/:id", Auth, controller.getProduct); //tested
routes.post("/create", Auth, controller.create); //tested
routes.put("/change", Auth, controller.updateProduct); //tested
routes.delete("/delete/:id", Auth, controller.deleteProduct); //tested

export default routes;
