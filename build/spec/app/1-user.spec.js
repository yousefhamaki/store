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
    username: "yousef-hamaki",
    email: "yousefhamaki4@gmail.com",
    password: "hamaki2603",
};
const user2 = {
    firstname: "yousef",
    lastname: "hamaki2",
    password: "hamaki2603",
};
const user3 = {
    email: "yousefhamaki7@gmail.com",
    password: "hamaki2603",
};
const newInfo = {
    firstname: "jo",
    lastname: "hamaki",
    username: "yousefhamaki",
    email: "yousefhamaki10@gmail.com",
    password: "hamaki2603",
};
const passinfo = {
    oldpass: "hamaki2603",
    newpass: "hamaki2604",
};
const request = (0, supertest_1.default)(index_1.default);
//api in app
describe("POST /api/user/create", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/create").send(user);
        user.id = res.body.data.id;
        newInfo.id = res.body.data.id;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/create").send(user2);
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("POST /api/user/login", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(user);
        user.token = res.body.data.token;
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `412`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(user2);
        expect(res.status).toEqual(412);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.post("/api/user/login").send(user3);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("failed");
    }));
});
describe("patch /api/user/", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .patch("/api/user/" + user.id)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
});
describe("put /api/user/change", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change")
            .send(newInfo)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request.put("/api/user/change").send(newInfo);
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
describe("put /api/user/change/:id", function () {
    it("returns status code `200` and password changed", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change/" + user.id)
            .send(passinfo)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `500`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .put("/api/user/change/" + user.id)
            .send(passinfo)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(500);
        expect(typeof res.body).toBe("object");
    }));
});
describe("getAll users from db", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/user/")
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .get("/api/user/")
            .set({ Authorization: user.token + "jknk" });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe(401);
    }));
});
describe("DELETE /api/user/remove/:id", function () {
    it("returns status code `200`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete(`/api/user/delete/${user.id}`)
            .set({ Authorization: user.token });
        expect(res.status).toEqual(200);
        expect(typeof res.body).toBe("object");
        expect(res.body.status).toBe("success");
    }));
    it("returns status code `401`", () => __awaiter(this, void 0, void 0, function* () {
        const res = yield request
            .delete("/api/user/delete/25adad")
            .set({ Authorization: user.token + "sdwamdk" });
        expect(res.status).toEqual(401);
        expect(typeof res.body).toBe("object");
    }));
});
