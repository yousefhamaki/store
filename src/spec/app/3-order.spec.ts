import supertest from "supertest";
import Order from "../../app/types/order.type";
import Product from "../../app/types/product.type";
import User from "../../app/types/user.type";
import app from "../../index";

const user = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki-order",
  email: "add_order@gmail.com",
  password: "hamaki2603",
} as User;

const product = {
  name: "test product",
  price: 250,
} as Product;

const order = {
  status: "active",
  quantity: 20,
} as Order;

const request = supertest(app);
//create and auth user to make product requests
describe("create new user and make auth to add order", function () {
  it("returns status code `200`", async () => {
    const res = await request.post("/api/user/create").send(user);

    user.id = res.body.data.id;
    order.user_id = res.body.data.id;

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/user/login")
      .send({ email: user.email, password: user.password });

    user.token = res.body.data.token;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });
});

//create product to add order to this product
describe("POST /api/product/create", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/create")
      .send(product)
      .set({ Authorization: user.token });

    product.id = res.body.data.id;
    order.product_id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });
});

//create new order
describe("POST /api/order/create", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/order/create")
      .send(order)
      .set({ Authorization: user.token });

    order.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.post("/api/order/create");

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });

  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/order/create")
      .set({ Authorization: user.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
  });
});

describe("GET /api/order/me", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/order/me")
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.get("/api/order/me");

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("GET /api/order/details/:order_id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .get(`/api/order/details/${order.id}`)
      .send(order)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.get(`/api/order/details/${order.id}`);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("PUT /api/order/update", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/order/update")
      .send(order)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.put("/api/order/update");

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

//remove order
describe("DELETE /api/delete/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/order/delete/" + order.id)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `500`", async () => {
    const res = await request.delete("/api/order/delete/" + order.id);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

//remove product who created to make order test
describe("DELETE /api/product/delete", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/product/delete/" + product.id)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });
});

//delete user who created in the first test
describe("DELETE /api/user/remove/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete(`/api/user/delete/${user.id}`)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });
});
