import supertest from "supertest";
import User from "../../app/types/user.type";
import app from "../../index";

const user = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki",
  email: "yousefhamaki4@gmail.com",
  password: "hamaki2603",
} as User;

const user2 = {
  firstname: "yousef",
  lastname: "hamaki2",
  password: "hamaki2603",
} as User;

const user3 = {
  email: "yousefhamaki7@gmail.com",
  password: "hamaki2603",
} as User;

const newInfo = {
  firstname: "jo",
  lastname: "hamaki",
  username: "yousefhamaki",
  email: "yousefhamaki10@gmail.com",
  password: "hamaki2603",
} as User;

const passinfo = {
  oldpass: "hamaki2603",
  newpass: "hamaki2604",
};

const request = supertest(app);

//api in app
describe("POST /api/user/create", function () {
  it("returns status code `200`", async () => {
    const res = await request.post("/api/user/create").send(user);

    user.id = res.body.data.id;
    newInfo.id = res.body.data.id;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `412`", async () => {
    const res = await request.post("/api/user/create").send(user2);

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("POST /api/user/login", function () {
  it("returns status code `200`", async () => {
    const res = await request.post("/api/user/login").send(user);

    user.token = res.body.data.token;
    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `412`", async () => {
    const res = await request.post("/api/user/login").send(user2);

    expect(res.status).toEqual(412);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });

  it("returns status code `401`", async () => {
    const res = await request.post("/api/user/login").send(user3);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("failed");
  });
});

describe("patch /api/user/", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .patch("/api/user/" + user.id)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });
});

describe("put /api/user/change", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .put("/api/user/change")
      .send(newInfo)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request.put("/api/user/change").send(newInfo);

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});

describe("put /api/user/change/:id", function () {
  it("returns status code `200` and password changed", async () => {
    const res = await request
      .put("/api/user/change/" + user.id)
      .send(passinfo)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `500`", async () => {
    const res = await request
      .put("/api/user/change/" + user.id)
      .send(passinfo)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(500);
    expect(typeof res.body).toBe("object");
  });
});

describe("getAll users from db", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .get("/api/user/")
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .get("/api/user/")
      .set({ Authorization: user.token + "jknk" });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe(401);
  });
});

describe("DELETE /api/user/remove/:id", function () {
  it("returns status code `200`", async () => {
    const res = await request
      .delete(`/api/user/delete/${user.id}`)
      .set({ Authorization: user.token });

    expect(res.status).toEqual(200);
    expect(typeof res.body).toBe("object");
    expect(res.body.status).toBe("success");
  });

  it("returns status code `401`", async () => {
    const res = await request
      .delete("/api/user/delete/25adad")
      .set({ Authorization: user.token + "sdwamdk" });

    expect(res.status).toEqual(401);
    expect(typeof res.body).toBe("object");
  });
});
