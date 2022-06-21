import { Request, Response, NextFunction } from "express";
import JsonReurn from "../interface/JsonReturn";
import QueryCheck from "../traits/CheckQuery";

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<JsonReurn> | void> => {
  /* request query handler */
  const required: { [key: string]: string } = {
    userid: "required",
    productid: "required",
    quantity: "required|number",
  };
  const requestInfo: string[] = QueryCheck(req.body, required);
  if (requestInfo.length > 0) {
    return res.status(412).json({
      status: "failed",
      message: requestInfo[0],
    });
  }
  //add order
  try {
    return res.json({
      status: "success",
      message: "Your order was added successfully",
    });
  } catch (err) {
    next(err);
  }
};

export default create;
