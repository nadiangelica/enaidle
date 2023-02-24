const server = require("../../server");
const request = require("supertest");
const db = require('../db');

const agent = request.agent(server);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("/indUsers", () => {
  describe("POST, when user first name, surname, email and password are valid", () => {
    test("the response code is 201 and returns a message to say signup has been successful", async () => {
      let response = await agent
        .post("/api/indUsers")
        .send({ 
          firstName: "John", 
          surname: "Jason", 
          email: "JohnJason@email.com", 
          password: "1234" 
        });
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual({
        message: "Thanks! your account has been successfully created",
      });
    });
  });
});
