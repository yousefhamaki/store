import { Router } from "express";
import UserRouter from "./api/user.router";
import ProductRouter from "./api/product.router";
import OrderRouter from "./api/order.router";

const router = Router();

router.use("/user", UserRouter);
router.use("/product", ProductRouter);
router.use("/order", OrderRouter);

export default router;
