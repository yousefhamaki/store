import JsonReurn from "../interface/JsonReturn";

/* user requests */
export const createUser: { [key: string]: string } = {
  email: "required",
  username: "required",
  firstname: "required",
  lastname: "required",
  password: "required",
};

export const makeLogin: { [key: string]: string } = {
  email: "required",
  password: "required",
};

export const updateUserInfo: { [key: string]: string } = {
  email: "required",
  username: "required",
  firstname: "required",
  lastname: "required",
  id: "required",
};

export const changePass: { [key: string]: string } = {
  oldpass: "required",
  newpass: "required",
};

/* product requests */
export const createProduct: { [key: string]: string } = {
  name: "required",
  price: "required|number",
};

export const updateProduct: { [key: string]: string } = {
  id: "required",
  name: "required",
  price: "required|number",
};

/* order requests */

export const createOrder: { [key: string]: string } = {
  product_id: "required",
  quantity: "required|number",
};

export const getOrder: { [key: string]: string } = {
  id: "required",
};

export const updateOrder: { [key: string]: string } = {
  id: "requirder",
  status: "required",
  product_id: "required",
  quantity: "required|number",
};

/* request return  */
export const validReturn = (errors: string[]): JsonReurn => {
  return {
    status: "failed",
    message: errors[0],
  };
};
