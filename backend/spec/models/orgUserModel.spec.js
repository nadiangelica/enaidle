const mongoose = require("mongoose");
require("../models/mongodb_helper");

const OrgUser = require("../../models/orgUserModel");

describe("OrgUser model", () => {
  beforeEach(async () => {
    await mongoose.connection.collections.orgusers.drop(() => {});
  });

  it("has the organisation name", () => {
    const orgUser = new OrgUser({
      organisationName: "Charity",
      email: "someone@example.com",
      charityNumber: "123456",
      password: "password",
    });

    expect(orgUser.organisationName).toEqual("Charity");
  });

  it("has an email address", () => {
    const orgUser = new OrgUser({
      organisationName: "Charity",
      email: "someone@example.com",
      charityNumber: "123456",
      password: "password",
    });

    expect(orgUser.email).toEqual("someone@example.com");
  });

  it("accepts a charity number", () => {
    const orgUser = new OrgUser({
      organisationName: "Charity",
      email: "someone@example.com",
      charityNumber: "123456",
      password: "password",
    });
    expect(orgUser.charityNumber).toEqual(123456);
  });

  it("has a password", () => {
    const orgUser = new OrgUser({
      organisationName: "Charity",
      email: "someone@example.com",
      charityNumber: "123456",
      password: "password",
    });
    expect(orgUser.password).toEqual("password");
  });

  describe("returns error messages when input fields are not filled out correctly", () => {
    it("accepts a blank charity number", () => {
      const orgUser = new OrgUser({
        organisationName: "Organisation",
        email: "someone@example.com",
        charityNumber: "",
        password: "password",
      });
      expect(orgUser.charityNumber).toEqual(null);
    });

    it("returns error message when any of the fields that are 'required' is left blank", () => {
      const orgUser = new OrgUser({
        organisationName: "",
        email: "",
        charityNumber: "123456",
        password: "",
      });
      expect(orgUser.error).not.toEqual("");
    })
  });
});
