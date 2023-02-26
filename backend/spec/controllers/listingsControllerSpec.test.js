const mongoose = require("mongoose");
const {
  getAllListings,
  createListing,
} = require("../../controllers/listingsController");
const ListingModel = require("../../models/listingModel");

// Use jest.mock() to mock the Listing model, so we can test the controller functions in isolation
jest.mock("../../models/listingModel");

describe("getAllListings", () => {
  it("should return all listings in descending order of creation date", async () => {
    // Create some test listings
    const listings = [
      { title: "Test Listing 1", createdAt: new Date("2022-01-01") },
      { title: "Test Listing 2", createdAt: new Date("2022-01-02") },
      { title: "Test Listing 3", createdAt: new Date("2022-01-03") },
    ];
    ListingModel.find.mockResolvedValue(listings);

    // Call the getAllListings function
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await getAllListings(req, res);

    // Check that the response is correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(listings);
  });
});

describe("createListing", () => {
  beforeEach(() => {
    //  Reset the mock before each test
    ListingModel.create.mockReset();
  });

  it("should create a new listing with valid input", async () => {
    // Call the createListing function with valid input
    const req = {
      body: {
        organisationName: "Test Organisation",
        title: "Test Listing",
        description: "Test description",
        address: {
          firstLine: "Test address",
          city: "London",
          postcode: "SW35SA",
        },
        neededByDate: new Date("2022-01-01"),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await createListing(req, res);

    // Check that the listing was created with the correct input
    expect(ListingModel.create).toHaveBeenCalledWith({
      organisationName: "Test Organisation",
      title: "Test Listing",
      description: "Test description",
      address: {
        firstLine: "Test address",
        city: "London",
        postcode: "SW35SA",
      },
      neededByDate: new Date("2022-01-01"),
    });
  });

  it("should return an error when a required field is not submitted", async () => {
    // Call the createListing function with missing input fields
    const req = {
      body: {
        organisationName: "Test Organisation",
        title: "Test Listing",
        requirement: "Volunteering",
        description: "Test description",
        address: {
          firstLine: "",
          City: "London",
          postcode: "W1 4SX",
        },
        neededByDate: new Date("2022-01-01"),
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await createListing(req, res);

    // Check that the response is correct
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });

  it("should return error messages when more than one required field are not submitted", async () => {
    // Call the createListing function with invalid input (e.g. invalid date format)
    const req = {
      body: {
        organisationName: "Test Organisation",
        title: "Test Listing",
        description: "",
        address: {
          firstLine: "",
          city: "London",
          postcode: "W1 3PS"
        },
        neededByDate: "Invalid date format",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await createListing(req, res);

    // Check that the response is correct
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });
});
