"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const requests = __importStar(require("./../traits/Requests"));
const Order_model_1 = __importDefault(require("../models/Order.model"));
const orderModel = new Order_model_1.default();
class OrderController {
    create(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const requestInfo = (0, CheckQuery_1.default)(req.body, requests.createOrder);
            if (requestInfo.length > 0) {
                return res.status(412).json(requests.validReturn(requestInfo));
            }
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                return res.status(401).json({
                    status: "failed",
                    message: "Failed login",
                });
            }
            req.body.user_id = req.user.id;
            //add order
            try {
                const create = yield orderModel.create(req.body);
                return res.json({
                    status: "success",
                    message: "Your order was added successfully",
                    data: Object.assign({}, create),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getOrder(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const requestInfo = (0, CheckQuery_1.default)(req.params, requests.getOrder);
            if (requestInfo.length > 0) {
                return res.status(412).json(requests.validReturn(requestInfo));
            }
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                return res.status(401).json({
                    status: "failed",
                    message: "Failed login",
                });
            }
            try {
                const order = yield orderModel.getOrder(req.params.id, (_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
                return res.json({
                    status: "success",
                    data: Object.assign({}, order),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getUserOrders(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                return res.status(401).json({
                    status: "failed",
                    message: "Failed login",
                });
            }
            try {
                const orders = yield orderModel.getUserOrders(req.user.id);
                return res.json({
                    status: "success",
                    data: Object.assign({}, orders),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteOrder(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                return res.status(401).json({
                    status: "failed",
                    message: "Failed login",
                });
            }
            try {
                const order = yield orderModel.deleteOrder(req.params.id, (_b = req.user) === null || _b === void 0 ? void 0 : _b.id);
                return res.json({
                    status: "success",
                    message: "This order was deleted successfully",
                    data: Object.assign({}, order),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateOrder(req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const requestInfo = (0, CheckQuery_1.default)(req.body, requests.updateOrder);
            if (requestInfo.length > 0) {
                return res.status(412).json(requests.validReturn(requestInfo));
            }
            if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                return res.status(401).json({
                    status: "failed",
                    message: "Failed login",
                });
            }
            req.body.user_id = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
            try {
                const update = yield orderModel.update(req.body);
                return res.json({
                    status: "success",
                    message: "Your order was updated successfully",
                    data: Object.assign({}, update),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = OrderController;
