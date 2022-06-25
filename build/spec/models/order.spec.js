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
const Order_model_1 = __importDefault(require("../../app/models/Order.model"));
const product_model_1 = __importDefault(require("../../app/models/product.model"));
const user_model_1 = __importDefault(require("../../app/models/user.model"));
const model = new Order_model_1.default();
const Productmodel = new product_model_1.default();
const userModel = new user_model_1.default();
const order = {
    quantity: 12,
    status: "active",
};
const product = {
    name: "product test model",
    price: 120,
};
const user = {
    firstname: "yousef",
    lastname: "hamaki2",
    username: "yousef-hamaki",
    email: "testordermodels@gmail.com",
    password: "hamaki2603",
};
describe("creating user and product to test order", () => {
    it("it expect new user created", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield userModel.create(user);
        order.user_id = create.id;
        user.id = create.id;
        expect(userModel.create).toBeDefined;
        expect(create.id).toBeDefined;
    }));
    it("it expect new product created", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield Productmodel.create(product);
        order.product_id = create.id;
        product.id = create.id;
        expect(Productmodel.create).toBeDefined;
        expect(create.id).toBeDefined;
    }));
});
describe("testing (OrderModel)", () => {
    it("it expect order created", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.create(order);
        order.id = create.id;
        expect(model.create).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.product_id).toBeDefined;
        expect(create.quantity).toBeDefined;
        expect(create.user_id).toBeDefined;
        expect(create.status).toBeDefined;
    }));
    it("it expect object contains order info", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getOrder(order.id, order.user_id);
        expect(model.getOrder).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.product_id).toBeDefined;
        expect(create.quantity).toBeDefined;
        expect(create.user_id).toBeDefined;
        expect(create.status).toBeDefined;
    }));
    it("it expect object contains all user order info", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getUserOrders(order.user_id);
        expect(model.getUserOrders).toBeDefined;
        expect(create.length).toEqual(1);
    }));
    it("it expect object order info after update", () => __awaiter(void 0, void 0, void 0, function* () {
        order.status = "completed";
        const create = yield model.update(order);
        expect(model.update).toBeDefined;
        expect(create.status).toEqual("completed");
    }));
    it("it expect order deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.deleteOrder(order.id, order.user_id);
        expect(model.deleteOrder).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.product_id).toBeDefined;
        expect(create.quantity).toBeDefined;
        expect(create.user_id).toBeDefined;
        expect(create.status).toBeDefined;
    }));
});
describe("remove user and product to end order test", () => {
    it("it expect product deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield Productmodel.deleteProduct(product.id);
        expect(Productmodel.deleteProduct).toBeDefined;
        expect(create.id).toBeDefined;
    }));
    it("it expect user removed", () => __awaiter(void 0, void 0, void 0, function* () {
        const remove = yield userModel.deleteUser(user.id);
        expect(userModel.deleteUser).toBeDefined;
        expect(remove.firstname).toBeDefined;
    }));
});
