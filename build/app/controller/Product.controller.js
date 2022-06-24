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
const product_model_1 = __importDefault(require("../models/product.model"));
const CheckQuery_1 = __importDefault(require("../traits/CheckQuery"));
const requests = __importStar(require("./../traits/Requests"));
const productModel = new product_model_1.default();
class ProductRouter {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const requestInfo = (0, CheckQuery_1.default)(req.body, requests.createProduct);
            if (requestInfo.length > 0) {
                return res.status(412).json(requests.validReturn(requestInfo));
            }
            try {
                //add product
                const create = yield productModel.create(req.body);
                return res.json({
                    status: "success",
                    message: "Your product was added successfully",
                    data: Object.assign({}, create),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAll(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productModel.getAll();
                return res.json({
                    status: "success",
                    data: Object.assign({}, products),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield productModel.getProduct(req.params.id);
                return res.json({
                    status: "success",
                    data: Object.assign({}, product),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const requestInfo = (0, CheckQuery_1.default)(req.body, requests.updateProduct);
            if (requestInfo.length > 0) {
                return res.status(412).json(requests.validReturn(requestInfo));
            }
            try {
                const update = yield productModel.updateProduct(req.body);
                return res.json({
                    status: "success",
                    message: "Your product was updated successfully",
                    data: Object.assign({}, update),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteInfo = yield productModel.deleteProduct(req.params.id);
                return res.json({
                    status: "success",
                    message: "Your product was deleted successfully",
                    data: Object.assign({}, deleteInfo),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ProductRouter;
