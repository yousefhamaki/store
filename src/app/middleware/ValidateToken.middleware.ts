import { NextFunction, Response } from "express";
// import Request from "./../interface/Request.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import Error from "../interface/Error.interface";
import config from "../config";
import ARequest from "../interface/Request.interface";

const HandleUnauthError = (next: NextFunction) => {
  const err: Error = new Error("error Auth: please try again");

  err.status = 401;
  next(err);
};

const ValidToken = (req: ARequest, _res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization as string;
    if (auth) {
      const authData = auth.split(" ");
      const authType = authData[0].toLowerCase();
      const token = authData[1];

      if (token && authType === "bearer") {
        const check: JwtPayload = jwt.verify(
          token,
          config.secretToken as unknown as string
        ) as JwtPayload;
        if (check) {
          req.user = check.user;
          next();
        } else {
          HandleUnauthError(next);
        }
      }
    } else {
      HandleUnauthError(next);
    }
  } catch (err) {
    HandleUnauthError(next);
  }
};

export default ValidToken;
