"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const ValidToken = (req, _res, next) => {
    try {
        const auth = req.headers.authorization;
        if (auth) {
            const authData = auth.split(" ");
            const authType = authData[0].toLowerCase;
            const token = authData[1];
            if (token && authType === "bearer") {
                const check = jsonwebtoken_1.default.verify(token, config_1.default.secretToken);
                if (check) {
                    next();
                }
            }
        }
        throw new Error("error Auth: please try again");
    }
    catch (err) {
        throw new Error("error Auth: please try again");
    }
};
exports.default = ValidToken;
