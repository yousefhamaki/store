import Order from "../../app/types/order.type";
import OrderModel from "../../app/models/Order.model";
import Product from "../../app/types/product.type";
import ProductModel from "../../app/models/product.model";
import UserModel from "../../app/models/user.model";
import User from "../../app/types/user.type";

const model = new OrderModel();
const Productmodel = new ProductModel();
const userModel = new UserModel();

const order = {
  quantity: 12,
  status: "active",
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
    order.product_id = create.id;
    product.id = create.id;

    expect(Productmodel.create).toBeDefined;
    expect(create.id).toBeDefined;
  });
});

describe("testing (OrderModel)", () => {
  it("it expect order created", async () => {
    const create = await model.create(order);
    order.id = create.id;
    expect(model.create).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.product_id).toBeDefined;
    expect(create.quantity).toBeDefined;
    expect(create.user_id).toBeDefined;
    expect(create.status).toBeDefined;
  });

  it("it expect object contains order info", async () => {
    const create = await model.getOrder(order.id, order.user_id);

    expect(model.getOrder).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.product_id).toBeDefined;
    expect(create.quantity).toBeDefined;
    expect(create.user_id).toBeDefined;
    expect(create.status).toBeDefined;
  });

  it("it expect object contains all user order info", async () => {
    const create = await model.getUserOrders(order.user_id);

    expect(model.getUserOrders).toBeDefined;
    expect(create.length).toEqual(1);
  });

  it("it expect object order info after update", async () => {
    order.status = "completed";
    const create = await model.update(order);

    expect(model.update).toBeDefined;
    expect(create.status).toEqual("completed");
  });

  it("it expect order deleted", async () => {
    const create = await model.deleteOrder(order.id, order.user_id);

    expect(model.deleteOrder).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.product_id).toBeDefined;
    expect(create.quantity).toBeDefined;
    expect(create.user_id).toBeDefined;
    expect(create.status).toBeDefined;
  });
});

describe("remove user and product to end order test", () => {
  it("it expect product deleted", async () => {
    const create = await Productmodel.deleteProduct(product.id);

    expect(Productmodel.deleteProduct).toBeDefined;
    expect(create.id).toBeDefined;
  });

  it("it expect user removed", async () => {
    const remove = await userModel.deleteUser(user.id as string);

    expect(userModel.deleteUser).toBeDefined;
    expect(remove.firstname).toBeDefined;
  });
});
