import { Router } from "express";
import controllers from "../../controller/UserController";
import Auth from "../../middleware/ValidateToken.middleware";

const routes = Router();

const controller = new controllers();

routes.get("/", Auth, controller.getAllUsers); //tested
routes.patch("/:id", Auth, controller.getUser); //tested
routes.post("/create", controller.create); //tested
routes.post("/login", controller.login); //tested
routes.put("/change", Auth, controller.updateuserinfo); //tested
routes.put("/change/:id", Auth, controller.changePass); //tested
routes.delete("/delete/:id", Auth, controller.deleteUser); //tested

export default routes;
