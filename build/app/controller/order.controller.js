"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CheckQuery_1 = __importDefault(require("../traits/CheckQuery"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /* request query handler */
    const required = {
        userid: "required",
        productid: "required",
        quantity: "required|number",
    };
    const requestInfo = (0, CheckQuery_1.default)(req.body, required);
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
    }
    catch (err) {
        next(err);
    }
});
exports.default = create;
