const server = require("../../server");
const request = require("supertest");
const db = require('../db');


const agent = request.agent(server);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/orgUsers", () => {
  describe("POST, when company name, email and password are valid, and charity number is blank", () => {
    test("the response code is 201 and returns a message to say signup has been successful", async () => {
      let response = await agent
        .post("/api/orgUsers")
        .send({ 
          organisationName: "Puppies Trust", 
          email: "poppy@email.com", 
          charityNumber: "", 
          password: "1234" 
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        message: "Thanks! your account has been successfully created",
      });
    });
  });
});
