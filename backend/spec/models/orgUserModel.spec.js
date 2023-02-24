const mongoose = require("mongoose");
require("../models/mongodb_helper");

const OrgUser = require("../../models/orgUserModel")

describe("OrgUser model", () => {
  beforeEach(async () => {
    await mongoose.connection.collections.orgusers.drop(() => {});
  });

  it("has an email address", () => {
    const orgUser = new OrgUser({
      organisationName: "Charity",
        email: "someone@example.com",
        charityNumber:"123456",
        password: "password",
    });

    expect(orgUser.email).toEqual("someone@example.com");
  });

  // it("has a password", () => {
  //   const orgUser = new OrgUser({
  //     organisationName: "Charity",
  //       email: "someone@example.com",
  //       charityNumber:"123456",
  //       password: "password",
  //   });
  //   expect(orgUser.password).toEqual("password");
  // });

  // it("has a organisation name", () => {
  //   const orgUser = new OrgUser({
  //       organisationName: "Charity",
  //       email: "someone@example.com",
  //       charityNumber:"123456",
  //       password: "password",
  //   });
  //   expect(orgUser.organisationName).toEqual("Charity");
  // });
 
  // it("accepts a charity number", () => {
  //   const orgUser = new OrgUser({
  //       organisationName: "Charity",
  //       email: "someone@example.com",
  //       charityNumber: "123456",
  //       password: "password",
  //   });
  //   expect(orgUser.charityNumber).toEqual(123456);
  // });

  // it("accepts a blank charity number", () => {
  //   const orgUser = new OrgUser({
  //       organisationName: "Organisation",
  //       email: "someone@example.com",
  //       charityNumber: "",
  //       password: "password",
  //   });
  //   expect(orgUser.charityNumber).toEqual(null);
  // });
});