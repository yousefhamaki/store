import { Router } from "express";
import Controllers from "./../../controller/order.controller";
import Auth from "../../middleware/ValidateToken.middleware";

const routes = Router();

const controllers = new Controllers();

routes.get("/details/:id", Auth, controllers.getOrder); //tested
routes.get("/me", Auth, controllers.getUserOrders); //tested
routes.post("/create", Auth, controllers.create); //tested
routes.put("/update", Auth, controllers.updateOrder);
routes.delete("/delete/:id", Auth, controllers.deleteOrder); //tested

export default routes;
