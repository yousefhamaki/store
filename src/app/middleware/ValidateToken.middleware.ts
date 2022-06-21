import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

const ValidToken = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (auth) {
      const authData = auth.split(" ");
      const authType = authData[0].toLowerCase as unknown;
      const token = authData[1];

      if (token && authType === "bearer") {
        const check = jwt.verify(
          token,
          config.secretToken as unknown as string
        );
        if (check) {
          next();
        }
      }
    }
    throw new Error("error Auth: please try again");
  } catch (err) {
    throw new Error("error Auth: please try again");
  }
};

export default ValidToken;
