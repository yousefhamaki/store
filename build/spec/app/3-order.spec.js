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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../index"));
const user = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki-order",
    email: "add_order@gmail.com",
    password: "hamaki2603",
};
const product = {
    name: "test product",
    price: 250,
};
const order = {
    status: "active",
    quantity: 20,
};
const request = (0, supertest_1.default)(index_1.default);
//create and auth user to make product requests
describe("create new user and make auth to add order", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/create").send(user);
        user.id = res.body.data.id;
        order.user_id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/user/login")
            .send({ email: user.email, password: user.password });
        user.token = res.body.data.token;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
//create product to add order to this product
describe("POST /api/product/create", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/create")
            .send(product)
            .set({ Authorization: user.token });
        product.id = res.body.data.id;
        order.product_id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
//create new order
describe("POST /api/order/create", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/order/create")
            .send(order)
            .set({ Authorization: user.token });
        order.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/order/create");
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/order/create")
            .set({ Authorization: user.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
    }));
});
describe("GET /api/order/me", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/order/me")
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/order/me");
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
describe("GET /api/order/details/:order_id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get(`/api/order/details/${order.id}`)
            .send(order)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get(`/api/order/details/${order.id}`);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
describe("PUT /api/order/update", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/order/update")
            .send(order)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.put("/api/order/update");
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
//remove order
describe("DELETE /api/delete/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/order/delete/" + order.id)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `500`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.delete("/api/order/delete/" + order.id);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
//remove product who created to make order test
describe("DELETE /api/product/delete", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/product/delete/" + product.id)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
//delete user who created in the first test
describe("DELETE /api/user/remove/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/user/delete/${user.id}`)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
