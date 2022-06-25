import supertest from "supertest";
import Product from "../../app/types/product.type";
import User from "../../app/types/user.type";
import app from "../../index";

const Puser = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki-product",
  email: "productemailtest@gmail.com",
  password: "hamaki2603",
} as User;

const user3 = {
  email: "productemailtest@gmail.com",
  password: "hamaki2603",
} as User;

const product = {
  name: "test-product",
  price: 250,
} as Product;

const Nproduct = {
  name: "test-product update",
  price: 300,
} as Product;

const product2 = {
  name: "test product",
} as Product;

const request = supertest(app);
//create and auth user to make product requests
describe("create user and make auth to add products", function () {
  it("returns status code `200`", async () => {
    const res = await request.post("/api/user/create").send(Puser);

    Puser.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `200`", async () => {
    const res = await request.post("/api/user/login").send(user3);

    Puser.token = res.body.data.token;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });
});

describe("POST /api/product/create", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .post("/api/product/create")
      .send(product)
      .set({ Authorization: Puser.token });

    product.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `412`", async () => {
    const res = await request
      .post("/api/product/create")
      .send(product2)
      .set({ Authorization: Puser.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });

  it("returns status code `401`", async () => {
    const res = await request.post("/api/product/create").send(product2);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("POST /api/product/", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/product")
      .set({ Authorization: Puser.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.get("/api/product/");

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("POST /api/product/change", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/product/change")
      .send({
        id: product.id,
        name: Nproduct.name,
        price: Nproduct.price,
      })
      .set({ Authorization: Puser.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.put("/api/product/change").send({
      id: product.id,
      name: Nproduct.name,
      price: Nproduct.price,
    });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });

  it("returns status code `412`", async () => {
    const res = await request
      .put("/api/product/change")
      .send(Nproduct)
      .set({ Authorization: Puser.token });

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("POST /api/product/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/product/" + product.id)
      .set({ Authorization: Puser.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.get("/api/product/" + product.id);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("DELETE /api/product/delete", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete("/api/product/delete/" + product.id)
      .set({ Authorization: Puser.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .delete("/api/product/delete/" + product.id)
      .send(product2);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

//delete user who created in the first test
describe("DELETE /api/user/remove/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete(`/api/user/delete/${Puser.id}`)
      .set({ Authorization: Puser.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });
});
