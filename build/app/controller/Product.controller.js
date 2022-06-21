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
const product_model_1 = __importDefault(require("../models/product.model"));
const CheckQuery_1 = __importDefault(require("../traits/CheckQuery"));
const productModel = new product_model_1.default();
class ProductRouter {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const required = {
                name: "required",
                price: "required|number",
            };
            const requestInfo = (0, CheckQuery_1.default)(req.body, required);
            if (requestInfo.length > 0) {
                return res.status(412).json({
                    status: "failed",
                    message: requestInfo[0],
                });
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
            const required = {
                id: "required",
                name: "required",
                price: "required|number",
            };
            const requestInfo = (0, CheckQuery_1.default)(req.body, required);
            if (requestInfo.length > 0) {
                return res.status(412).json({
                    status: "failed",
                    message: requestInfo[0],
                });
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
