import { Router } from "express";
import controllers from "./../../controller/Product.controller";

const routes = Router();
const controller = new controllers();

routes.get("/", controller.getAll);
routes.get("/:id", controller.getProduct);
routes.post("/create", controller.create);
routes.put("/change", controller.updateProduct);
routes.delete("/delete/:id", controller.deleteProduct);

export default routes;
