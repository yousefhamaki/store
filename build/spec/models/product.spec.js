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
const product_model_1 = __importDefault(require("../../app/models/product.model"));
const model = new product_model_1.default();
const product = {
    name: "product test model",
    price: 120,
};
const product2 = {
    name: "product update test model",
    price: 150,
};
describe("testing (productModel)", () => {
    it("it expect new product created", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.create(product);
        product.id = create.id;
        product2.id = create.id;
        expect(model.create).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.name).toBeDefined;
        expect(create.price).toBeDefined;
    }));
    it("it expect to get product by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getProduct(product.id);
        expect(model.getProduct).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.name).toBeDefined;
        expect(create.price).toBeDefined;
    }));
    it("it expect get AllProducts in db", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.getAll();
        expect(model.getAll).toBeDefined;
        expect(create.length).toEqual(1);
    }));
    it("it expect update product details", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.updateProduct(product2);
        expect(model.updateProduct).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.name).toBeDefined;
        expect(create.price).toBeDefined;
    }));
    it("it expect product deleted", () => __awaiter(void 0, void 0, void 0, function* () {
        const create = yield model.deleteProduct(product.id);
        expect(model.deleteProduct).toBeDefined;
        expect(create.id).toBeDefined;
        expect(create.name).toBeDefined;
        expect(create.price).toBeDefined;
    }));
});
