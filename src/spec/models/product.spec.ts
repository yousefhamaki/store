import Product from "../../app/types/product.type";
import ProductModel from "../../app/models/product.model";

const model = new ProductModel();

const product = {
  name: "product test model",
  price: 120,
} as Product;

const product2 = {
  name: "product update test model",
  price: 150,
} as Product;

describe("testing (productModel)", () => {
  it("it expect new product created", async () => {
    const create = await model.create(product);
    product.id = create.id;
    product2.id = create.id;

    expect(model.create).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toBeDefined;
    expect(create.price).toBeDefined;
  });

  it("it expect to get product by id", async () => {
    const create = await model.getProduct(product.id);

    expect(model.getProduct).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toBeDefined;
    expect(create.price).toBeDefined;
  });

  it("it expect get AllProducts in db", async () => {
    const create = await model.getAll();

    expect(model.getAll).toBeDefined;
    expect(create.length).toEqual(1);
  });

  it("it expect update product details", async () => {
    const create = await model.updateProduct(product2);

    expect(model.updateProduct).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toBeDefined;
    expect(create.price).toBeDefined;
  });

  it("it expect product deleted", async () => {
    const create = await model.deleteProduct(product.id);

    expect(model.deleteProduct).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.name).toBeDefined;
    expect(create.price).toBeDefined;
  });
});
