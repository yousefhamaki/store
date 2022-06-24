import { Response, NextFunction } from "express";
import JsonReurn from "../interface/JsonReturn";
import QueryCheck from "../traits/CheckQuery";
import * as requests from "./../traits/Requests";
import OrderModel from "../models/Order.model";
import ARequest from "../interface/Request.interface";

const orderModel = new OrderModel();

class OrderController {
  async create(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    /* request query handler */
    const requestInfo: string[] = QueryCheck(req.body, requests.createOrder);
    if (requestInfo.length > 0) {
      return res.status(412).json(requests.validReturn(requestInfo));
    }

    if (!req.user?.id) {
      return res.status(401).json({
        status: "failed",
        message: "Failed login",
      });
    }
    req.body.user_id = req.user.id;
    //add order
    try {
      const create = await orderModel.create(req.body);

      return res.json({
        status: "success",
        message: "Your order was added successfully",
        data: { ...create },
      });
    } catch (err) {
      next(err);
    }
  }

  async getOrder(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    /* request query handler */
    const requestInfo: string[] = QueryCheck(req.params, requests.getOrder);
    if (requestInfo.length > 0) {
      return res.status(412).json(requests.validReturn(requestInfo));
    }
    if (!req.user?.id) {
      return res.status(401).json({
        status: "failed",
        message: "Failed login",
      });
    }

    try {
      const order = await orderModel.getOrder(req.params.id, req.user?.id);

      return res.json({
        status: "success",
        data: { ...order },
      });
    } catch (err) {
      next(err);
    }
  }

  async getUserOrders(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    if (!req.user?.id) {
      return res.status(401).json({
        status: "failed",
        message: "Failed login",
      });
    }
    try {
      const orders = await orderModel.getUserOrders(req.user.id);

      return res.json({
        status: "success",
        data: { ...orders },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteOrder(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    if (!req.user?.id) {
      return res.status(401).json({
        status: "failed",
        message: "Failed login",
      });
    }
    try {
      const order = await orderModel.deleteOrder(req.params.id, req.user?.id);

      return res.json({
        status: "success",
        message: "This order was deleted successfully",
        data: { ...order },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateOrder(
    req: ARequest,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    /* request query handler */
    const requestInfo: string[] = QueryCheck(req.body, requests.updateOrder);
    if (requestInfo.length > 0) {
      return res.status(412).json(requests.validReturn(requestInfo));
    }

    if (!req.user?.id) {
      return res.status(401).json({
        status: "failed",
        message: "Failed login",
      });
    }
    req.body.user_id = req.user?.id;
    try {
      const update = await orderModel.update(req.body);

      return res.json({
        status: "success",
        message: "Your order was updated successfully",
        data: { ...update },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default OrderController;
