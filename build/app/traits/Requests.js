"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validReturn = exports.updateOrder = exports.createOrder = exports.updateProduct = exports.createProduct = exports.changePass = exports.updateUserInfo = exports.makeLogin = exports.createUser = void 0;
/* user requests */
exports.createUser = {
    username: "required",
    firstname: "required",
    lastname: "required",
    email: "required",
    password: "required",
};
exports.makeLogin = {
    email: "required",
    password: "required",
};
exports.updateUserInfo = {
    email: "required",
    username: "required",
    firstname: "required",
    lastname: "required",
    id: "required",
};
exports.changePass = {
    oldpass: "required",
    newpass: "required",
};
/* product requests */
exports.createProduct = {
    name: "required",
    price: "required|number",
};
exports.updateProduct = {
    id: "required",
    name: "required",
    price: "required|number",
};
/* order requests */
exports.createOrder = {
    products: "required|array",
};
exports.updateOrder = {
    id: "requirder",
    status: "required",
    product_id: "required",
    quantity: "required|number",
};
/* request return  */
const validReturn = (errors) => {
    return {
        status: "failed",
        message: errors[0],
    };
};
exports.validReturn = validReturn;
