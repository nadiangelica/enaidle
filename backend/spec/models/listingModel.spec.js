const mongoose = require("mongoose");
const db = require("../../spec/mongoMemoryDB");

const Listing= require("../../models/listingModel");

describe("Listing model", () => {
  beforeAll(async () => await db.connect());
  beforeEach(async () => await db.clear());
  afterAll(async () => await db.close());

  const newAd = new Listing({
    organisationName: "Charity X",
    title: "Volunteers needed",
    requirement: "Volunteering",
    description: "x3 volunteers needed to help with organising event X",
    address: {
      firstLine: "10 Downing St",
      city: "London",
      postcode: "W1 2AD"
    },
    neededByDate: new Date("2022-03-01") 
  }) 

  test("has the organisation name", () => {
    expect(newAd.organisationName).toEqual("Charity X");
  });

  test("has a title", () => {
    expect(newAd.title).toEqual("Volunteers needed");
  });

  test("has requirement filled in", () => {
    expect(newAd.requirement).toEqual("Volunteering");
  });

  test("has a description", () => {
    expect(newAd.description).toEqual("x3 volunteers needed to help with organising event X");
  });

  test("has an address", () => {
    expect(newAd.address).toEqual({
      firstLine: "10 Downing St",
      city: "London",
      postcode: "W1 2AD"
    });
  });

  test("has a neededByDate", () => {
    expect(newAd.neededByDate).toEqual(new Date("2022-03-01T00:00:00.000Z"));
  });

  test("display error message when the client does not submit a 'title'", () => {
    const adMissingTitle = new Listing({
      organisationName: "Charity X",
      title: "",
      requirement: "Volunteering",
      description: "x3 volunteers needed to help with organising event X",
      address: {
        firstLine: "10 Downing St",
        city: "London",
        postcode: "W1 2AD"
      },
      neededByDate: new Date("2022-03-01") 
    })

    expect(adMissingTitle.error).not.toEqual("");
  });

  test("display error messages when the client does not submit all the required fields'", () => {
    const incompleteForm = new Listing({
      organisationName: "",
      title: "",
      requirement: "",
      description: "",
      address: {
        firstLine: "",
        city: "",
        postcode: ""
      },
      neededByDate: "" 
    })

    expect(incompleteForm.error).not.toEqual("");
  });
});
