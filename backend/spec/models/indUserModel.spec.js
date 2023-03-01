const mongoose = require("mongoose");
// const request = require("supertest");
const db = require("../../spec/mongoMemoryDB");
const IndUser = require("../../models/indUserModel");

describe("IndUser model", () => {
  beforeAll(async () => await db.connect());
  beforeEach(async () => await db.clear());
  afterAll(async () => await db.close());

  it("has the user's first name", () => {
    const indUser = new IndUser({
      firstName: "John",
      lastName: "Jason",
      email: "johnjason@mail.com",
      password: "Password1!",
    });

    expect(indUser.firstName).toEqual("John");
  });

  it("has the user's last name", () => {
    const indUser = new IndUser({
      firstName: "John",
      lastName: "Jason",
      email: "johnjason@mail.com",
      password: "Password1!",
    });

    expect(indUser.lastName).toEqual("Jason");
  });

  it("has an email address", () => {
    const indUser = new IndUser({
      firstName: "John",
      lastName: "Jason",
      email: "johnjason@mail.com",
      password: "Password1!",
    });
    expect(indUser.email).toEqual("johnjason@mail.com");
  });

  it("has a password", () => {
    const indUser = new IndUser({
      irstName: "John",
      lastName: "Jason",
      email: "johnjason@mail.com",
      password: "Password1!",
    });
    expect(indUser.password).toEqual("Password1!");
  });
  
  describe("Returns error messages when input fields are not filled out correctly", () => {
    it("returns error message when any of the fields that are 'required' is left blank", () => {
      const indUser = new IndUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      expect(indUser.error).not.toEqual("");
    });
  });
});
