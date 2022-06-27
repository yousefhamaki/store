import { Router } from "express";
import Controllers from "./../../controller/order.controller";
import Auth from "../../middleware/ValidateToken.middleware";

const routes = Router();

const controllers = new Controllers();

routes.get("/details/:id", Auth, controllers.getOrder); //tested
routes.get("/me", Auth, controllers.getUserOrders); //tested
routes.get("/completed", Auth, controllers.getCompletedOrders); //tested
routes.post("/create", Auth, controllers.create); //tested

export default routes;
