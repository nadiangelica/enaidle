const mongoose = require("mongoose");
const {
  getAllListings,
  createListing,
  deleteListing,
  addCommentToAListing,
} = require("../../controllers/listingsController");
const Listing = require("../../models/listingModel");

// Use jest.mock() to mock the Listing model, so we can test the controller functions in isolation
jest.mock("../../models/listingModel");

describe("Listings controller", () => {
  it("should return all listings in descending order of creation date", async () => {
    // Create some test listings
    const listings = [
      { title: "Test Listing 1", createdAt: new Date("2022-01-01") },
      { title: "Test Listing 2", createdAt: new Date("2022-01-02") },
      { title: "Test Listing 3", createdAt: new Date("2022-01-03") },
    ];
    Listing.find.mockResolvedValue(listings);

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

describe("Create a listing", () => {
  beforeEach(() => {
    //  Reset the mock before each test
    Listing.create.mockReset();
  });

  it("should create a new listing with valid input", async () => {
    // Call the createListing function with valid input
    const req = {
      body: {
        organisationName: "Test Organisation",
        title: "Test Listing",
        requirement: "Volunteering",
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
    expect(Listing.create).toHaveBeenCalledWith({
      organisationName: "Test Organisation",
      title: "Test Listing",
      description: "Test description",
      requirement: "Volunteering",
      address: {
        firstLine: "Test address",
        city: "London",
        postcode: "SW35SA",
      },
      neededByDate: new Date("2022-01-01"),
      comments: []
    });
  });

  it.skip("should return an error with invalid input", async () => {
    // Call the createListing function with invalid input (e.g. invalid date format)
    const req = {
      body: {
        organisationName: "",
        title: "Test Listing",
        description: "Test description",
        address: "",
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
    // Check that the listing was not created
    expect(Listing.create).not.toHaveBeenCalled();
  });

  describe("Create a Comment", () => {
    it("org user can add a comment to a listing", async () => {
      const listing = {
        organisationName: "Test Organisation",
        title: "Test Listing",
        description: "Test description",
        requirement: "Volunteering",
        address: {
          firstLine: "Test address",
          city: "London",
          postcode: "SW35SA",
       },
        neededByDate: new Date("2022-01-01"),
        comments: [],
        save: jest.fn(),
      };
      Listing.findById.mockResolvedValue(listing);

      // Call the getAllListings function
      const req = {
        params: {
          id: "wef3few68243",
        },
        body: {
          orgUserId: "384t38423",
          content: "org user making a comment",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await addCommentToAListing(req, res);

      expect(listing.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it("ind user can add a comment to a listing", async () => {
      const listing = {
        organisationName: "Test Organisation",
        title: "Test Listing",
        description: "Test description",
        requirement: "Volunteering",
        address: {
          firstLine: "Test address",
          city: "London",
          postcode: "SW35SA",
       },
        neededByDate: new Date("2022-01-01"),
        comments: [],
        save: jest.fn(),
      };
      Listing.findById.mockResolvedValue(listing);

      // Call the getAllListings function
      const req = {
        params: {
          id: "wef3few68243",
        },
        body: {
          indUserId: "384t38423",
          content: "ind user making a comment too",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await addCommentToAListing(req, res);

      expect(listing.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});
