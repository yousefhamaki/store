import { Request, Response, NextFunction } from "express";
import JsonReurn from "../interface/JsonReturn";
import ProductModel from "../models/product.model";
import QueryCheck from "../traits/CheckQuery";

const productModel = new ProductModel();

class ProductRouter {
  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    /* request query handler */
    const required: { [key: string]: string } = {
      name: "required",
      price: "required|number",
    };
    const requestInfo: string[] = QueryCheck(req.body, required);
    if (requestInfo.length > 0) {
      return res.status(412).json({
        status: "failed",
        message: requestInfo[0],
      });
    }

    try {
      //add product
      const create = await productModel.create(req.body);
      return res.json({
        status: "success",
        message: "Your product was added successfully",
        data: { ...create },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAll(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const products = await productModel.getAll();

      return res.json({
        status: "success",
        data: { ...products },
      });
    } catch (err) {
      next(err);
    }
  }

  async getProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const product = await productModel.getProduct(req.params.id);

      return res.json({
        status: "success",
        data: { ...product },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    /* request query handler */
    const required: { [key: string]: string } = {
      id: "required",
      name: "required",
      price: "required|number",
    };
    const requestInfo: string[] = QueryCheck(req.body, required);
    if (requestInfo.length > 0) {
      return res.status(412).json({
        status: "failed",
        message: requestInfo[0],
      });
    }

    try {
      const update = await productModel.updateProduct(req.body);

      return res.json({
        status: "success",
        message: "Your product was updated successfully",
        data: { ...update },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const deleteInfo = await productModel.deleteProduct(req.params.id);

      return res.json({
        status: "success",
        message: "Your product was deleted successfully",
        data: { ...deleteInfo },
      });
    } catch (err) {
      next(err);
    }
  }
}

export default ProductRouter;
