import userModel from "../../app/models/user.model";
import User from "../../app/types/user.type";

const model = new userModel();
const user = {
  firstname: "yousef",
  lastname: "hamaki2",
  username: "yousef-hamaki",
  email: "yousefhamaki3@gmail.com",
  password: "hamaki2603",
} as User;

const user2 = {
  firstname: "yousef",
  lastname: "elsayed",
  username: "yousefhamaki",
  email: "yousefhamaki22@gmail.com",
  password: "hamaki2604",
} as User;

describe("testing (userModel)", function () {
  it("it expect new user created", async () => {
    const create = await model.create(user);
    user.id = create.id;
    user2.id = create.id;

    expect(model.create).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.firstname).toBeDefined;
    expect(create.lastname).toBeDefined;
    expect(create.username).toBeDefined;
    expect(create.email).toBeDefined;
  });

  it("expect (getAll users) return object contains users", async () => {
    const create = await model.getAll();

    expect(model.getAll).toBeDefined;
    expect(create).toBeDefined;
  });

  it("expect (updateUser) return object contains users", async () => {
    const create = await model.updateUser(user2);

    expect(model.getUser).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.firstname).toBeDefined;
    expect(create.lastname).toBeDefined;
    expect(create.username).toBeDefined;
    expect(create.email).toBeDefined;
  });

  it("expect (makeAuth) return boolean (true)", async () => {
    const auth = await model.makeAuth(user.email, user.password);

    expect(model.makeAuth).toBeDefined;
    expect(auth).toBeDefined;
  });

  it("expect (changePass) return boolean (true)", async () => {
    const create = await model.changePass(
      user.id as string,
      user.password,
      user2.password
    );

    expect(model.changePass).toBeDefined;
    expect(create).toBeTrue;
  });

  it("expect (getuser) return object contains users", async () => {
    const create = await model.getUser(user.id as string);

    expect(model.getUser).toBeDefined;
    expect(create.id).toBeDefined;
    expect(create.firstname).toBeDefined;
    expect(create.lastname).toBeDefined;
    expect(create.username).toBeDefined;
    expect(create.email).toBeDefined;
  });

  it("it expect user removed", async () => {
    const remove = await model.deleteUser(user.id as string);

    expect(model.deleteUser).toBeDefined;
    expect(remove.firstname).toBeDefined;
    expect(remove.lastname).toBeDefined;
    expect(remove.username).toBeDefined;
    expect(remove.email).toBeDefined;
  });
});
