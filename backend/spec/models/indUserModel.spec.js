const mongoose = require("mongoose");
const IndUser = require("../../models/indUserModel")

describe("IndUser model", () => {
  // beforeEach(async () => {
  //   await mongoose.connection.collections.users.drop(() => {});
  // });

  it("has a first name", () => {
    const indUser = new IndUser({
      firstName: "John",
      surname: "Jason",
      email:"JohnJason@mail.com",
      password: "password",
    });

    expect(indUser.firstName).toEqual("John");
  });

  it("has a surname", () => {
    const indUser = new IndUser({
      firstName: "John",
      surname: "Jason",
      email:"JohnJason@mail.com",
      password: "password",
    });

    expect(indUser.surname).toEqual("Jason");
  });
  
  it("has an email address", () => {
    const indUser = new IndUser({
      firstName: "John",
      surname: "Jason",
      email:"JohnJason@mail.com",
      password: "password",
    });

    expect(indUser.email).toEqual("JohnJason@mail.com");
  });

  it("has a password", () => {
    const indUser = new IndUser({
      firstName: "John",
      surname: "Jason",
      email:"JohnJason@mail.com",
      password: "password",
    });

    expect(indUser.password).toEqual("password");
  });
});