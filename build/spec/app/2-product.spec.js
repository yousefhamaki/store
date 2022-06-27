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
const Puser = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki-product",
    email: "productemailtest@gmail.com",
    password: "hamaki2603",
};
const user3 = {
    email: "productemailtest@gmail.com",
    password: "hamaki2603",
};
const product = {
    name: "test-product",
    price: 250,
};
const product2 = {
    name: "test product",
};
const request = (0, supertest_1.default)(index_1.default);
//create and auth user to make product requests
describe("create user and make auth to add products", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/create").send(Puser);
        Puser.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(user3);
        Puser.token = res.body.data.token;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
describe("POST /api/product/create", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/create")
            .send(product)
            .set({ Authorization: Puser.token });
        product.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .post("/api/product/create")
            .send(product2)
            .set({ Authorization: Puser.token });
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/product/create").send(product2);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
describe("POST /api/product/", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/product")
            .set({ Authorization: Puser.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/product/");
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
describe("POST /api/product/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/product/" + product.id)
            .set({ Authorization: Puser.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.get("/api/product/" + product.id);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
//delete user who created in the first test
describe("DELETE /api/user/remove/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/user/delete/${Puser.id}`)
            .set({ Authorization: Puser.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
