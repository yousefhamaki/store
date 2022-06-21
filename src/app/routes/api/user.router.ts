import { Router } from "express";
import controllers from "../../controller/UserController";

const routes = Router();

const controller = new controllers();

routes.get("/", controller.getAllUsers);
routes.get("/:id", controller.getUser);
routes.post("/create", controller.create);
routes.post("/login", controller.login);
routes.put("/change", controller.updateuserinfo);
routes.put("/change/:id", controller.changePass);
routes.delete("/delete/:id", controller.deleteUser);

export default routes;
