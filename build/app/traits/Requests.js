"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validReturn = exports.updateOrder = exports.getOrder = exports.createOrder = exports.updateProduct = exports.createProduct = exports.changePass = exports.updateUserInfo = exports.makeLogin = exports.createUser = void 0;
/* user requests */
exports.createUser = {
    email: "required",
    username: "required",
    firstname: "required",
    lastname: "required",
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
    product_id: "required",
    quantity: "required|number",
};
exports.getOrder = {
    id: "required",
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
