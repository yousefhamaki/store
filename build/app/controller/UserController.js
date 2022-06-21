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
const user_model_1 = __importDefault(require("./../models/user.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const userModel = new user_model_1.default();
class userController {
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const required = {
                email: "required",
                username: "required",
                firstname: "required",
                lastname: "required",
                password: "required",
            };
            const requestInfo = (0, CheckQuery_1.default)(req.body, required);
            if (requestInfo.length > 0) {
                return res.status(412).json({
                    status: "failed",
                    message: requestInfo[0],
                });
            }
            //add new user
            try {
                const create = yield userModel.create(req.body);
                return res.json({
                    status: "success",
                    message: "User created successfully",
                    data: Object.assign({}, create),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getAllUsers(_req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel.getAll();
                res.json({
                    status: "success",
                    data: Object.assign({}, users),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    getUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield userModel.getUser(req.params.id);
                return res.json({
                    status: "success",
                    data: user,
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const required = {
                email: "required",
                password: "required",
            };
            const requestInfo = (0, CheckQuery_1.default)(req.body, required);
            if (requestInfo.length > 0) {
                return res.status(412).json({
                    status: "failed",
                    message: requestInfo[0],
                });
            }
            try {
                const { email, password } = req.body;
                const user = yield userModel.makeAuth(email, password);
                if (!user) {
                    return res.status(401).json({
                        status: "failed",
                        message: "email or password is not correct",
                    });
                }
                const token = jsonwebtoken_1.default.sign({ user }, config_1.default.secretToken);
                return res.status(401).json({
                    status: "success",
                    message: "user is login successfully",
                    data: Object.assign(Object.assign({}, user), { token }),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    updateuserinfo(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const required = {
                email: "required",
                username: "required",
                firstname: "required",
                lastname: "required",
            };
            const requestInfo = (0, CheckQuery_1.default)(req.body, required);
            if (requestInfo.length > 0) {
                return res.status(412).json({
                    status: "failed",
                    message: requestInfo[0],
                });
            }
            try {
                const change = yield userModel.updateUser(req.body);
                return res.json({
                    status: "success",
                    message: "Your info is updated successfully",
                    data: Object.assign({}, change),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteInfo = yield userModel.deleteUser(req.params.id);
                return res.json({
                    status: "success",
                    message: "User is deleted successfully",
                    data: Object.assign({}, deleteInfo),
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    changePass(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            /* request query handler */
            const required = {
                oldpass: "required",
                newpass: "required",
            };
            const requestInfo = (0, CheckQuery_1.default)(req.body, required);
            if (requestInfo.length > 0) {
                return res.status(412).json({
                    status: "failed",
                    message: requestInfo[0],
                });
            }
            try {
                const update = yield userModel.changePass(req.params.id, req.body.oldpass, req.body.newpass);
                if (update) {
                    return res.json({
                        status: "success",
                        message: "your password was changed successfully",
                    });
                }
                else {
                    throw new Error("old password is not correct");
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = userController;
