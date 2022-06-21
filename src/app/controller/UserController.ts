import { NextFunction, Request, Response } from "express";
import QueryCheck from "../traits/CheckQuery";
import UserModel from "./../models/user.model";
import JsonReurn from "../interface/JsonReturn";
import jwt from "jsonwebtoken";
import config from "../config";

const userModel = new UserModel();

class userController {
  async create(
    req: Request,
    res: Response<JsonReurn>,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    /* request query handler */
    const required: { [key: string]: string } = {
      email: "required",
      username: "required",
      firstname: "required",
      lastname: "required",
      password: "required",
    };
    const requestInfo: string[] = QueryCheck(req.body, required);
    if (requestInfo.length > 0) {
      return res.status(412).json({
        status: "failed",
        message: requestInfo[0],
      });
    }
    //add new user
    try {
      const create = await userModel.create(req.body);

      return res.json({
        status: "success",
        message: "User created successfully",
        data: { ...create },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAllUsers(
    _req: Request,
    res: Response<JsonReurn>,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const users = await userModel.getAll();

      res.json({
        status: "success",
        data: { ...users },
      });
    } catch (err) {
      next(err);
    }
  }

  async getUser(
    req: Request,
    res: Response<JsonReurn>,
    next: NextFunction
  ): Promise<Request<JsonReurn> | unknown> {
    try {
      const user = await userModel.getUser(req.params.id);

      return res.json({
        status: "success",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(
    req: Request,
    res: Response<JsonReurn>,
    next: NextFunction
  ): Promise<Request<JsonReurn> | unknown> {
    /* request query handler */
    const required: { [key: string]: string } = {
      email: "required",
      password: "required",
    };
    const requestInfo: string[] = QueryCheck(req.body, required);
    if (requestInfo.length > 0) {
      return res.status(412).json({
        status: "failed",
        message: requestInfo[0],
      });
    }

    try {
      const { email, password } = req.body;

      const user = await userModel.makeAuth(email, password);
      if (!user) {
        return res.status(401).json({
          status: "failed",
          message: "email or password is not correct",
        });
      }
      const token = jwt.sign({ user }, config.secretToken as unknown as string);
      return res.status(401).json({
        status: "success",
        message: "user is login successfully",
        data: { ...user, token },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateuserinfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    /* request query handler */
    const required: { [key: string]: string } = {
      email: "required",
      username: "required",
      firstname: "required",
      lastname: "required",
    };
    const requestInfo: string[] = QueryCheck(req.body, required);
    if (requestInfo.length > 0) {
      return res.status(412).json({
        status: "failed",
        message: requestInfo[0],
      });
    }
    try {
      const change = await userModel.updateUser(req.body);

      return res.json({
        status: "success",
        message: "Your info is updated successfully",
        data: { ...change },
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    try {
      const deleteInfo = await userModel.deleteUser(req.params.id);

      return res.json({
        status: "success",
        message: "User is deleted successfully",
        data: { ...deleteInfo },
      });
    } catch (err) {
      next(err);
    }
  }

  async changePass(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<JsonReurn> | void> {
    /* request query handler */
    const required: { [key: string]: string } = {
      oldpass: "required",
      newpass: "required",
    };
    const requestInfo: string[] = QueryCheck(req.body, required);
    if (requestInfo.length > 0) {
      return res.status(412).json({
        status: "failed",
        message: requestInfo[0],
      });
    }
    try {
      const update = await userModel.changePass(
        req.params.id,
        req.body.oldpass,
        req.body.newpass
      );

      if (update) {
        return res.json({
          status: "success",
          message: "your password was changed successfully",
        });
      } else {
        throw new Error("old password is not correct");
      }
    } catch (err) {
      next(err);
    }
  }
}

export default userController;
