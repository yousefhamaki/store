import { Router } from "express";
import UserRouter from "./api/user.router";
import ProductRouter from "./api/product.router";
import OrderRouter from "./api/order.router";

const router = Router();

router.use("/api/user", UserRouter);
router.use("/api/product", ProductRouter);
router.use("*api/order", OrderRouter);

export default router;
