import Order from "../../app/types/order.type";
import OrderModel from "../../app/models/Order.model";
import Product from "../../app/types/product.type";
import ProductModel from "../../app/models/product.model";
import UserModel from "../../app/models/user.model";
import User from "../../app/types/user.type";

const model = new OrderModel();
const Productmodel = new ProductModel();
const userModel = new UserModel();
const model2 = new ProductModel();

const order = {
  status: "active",
  order_id: "" as string,
} as Order;

const product = {
  name: "product test model",
  price: 120,
} as Product;

const user = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki",
  email: "testordermodels@gmail.com",
  password: "hamaki2603",
} as User;

describe("creating user and product to test order", () => {
  it("it expect new user created", async () => {
    const create = await userModel.create(user);
    order.user_id = create.id as string;
    user.id = create.id;

    expect(userModel.create).toBeDefined;
    expect(create.id).toBeDefined;
  });

  it("it expect new product created", async () => {
    const create = await Productmodel.create(product);
    order.products = [{ id: create.id, quantity: 12 }];
    product.id = create.id;

    expect(Productmodel.create).toBeDefined;
    expect(create.id).toBeDefined;
  });
});

describe("testing (productModel)", () => {
  it("it expect to get product by id", async () => {
    const create = await model2.getProduct(product.id);

    expect(model2.getProduct).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toBeDefined;
    expect(create.price).toBeDefined;
  });

  it("it expect get AllProducts in db", async () => {
    const create = await model2.getAll();

    expect(model2.getAll).toBeDefined;
    expect(create.length).toBeGreaterThan(0);
  });
});

describe("testing (OrderModel)", () => {
  it("it expect order created", async () => {
    const create = await model.create(order);
    order.order_id = create[0].order_id as string;
    expect(model.create).toBeDefined;
    expect(create.length).toBe(1);
  });

  it("it expect object contains order info", async () => {
    const create = await model.getOrder(order.order_id, order.user_id);

    expect(model.getOrder).toBeDefined;
    expect(create.length).toBeGreaterThan(0);
  });

  it("it expect object contains all user order info", async () => {
    const create = await model.getUserOrders(order.user_id);

    expect(model.getUserOrders).toBeDefined;
    expect(create.length).toEqual(1);
  });

  it("it expect array", async () => {
    const create = await model.completedOrders(order.user_id);

    expect(model.getUserOrders).toBeDefined;
    expect(create.length).toEqual(0);
  });
});
