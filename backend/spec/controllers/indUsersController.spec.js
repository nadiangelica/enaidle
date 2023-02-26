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

  describe("POST, when user first name, surname, email or password are invalid", () => {
    test("the response code is 400 and returns an error stating first name is required", async () => {
      let response = await agent
        .post("/api/indUsers")
        .send({ 
          firstName: "", 
          surname: "Jason", 
          email: "JohnJason@email.com", 
          password: "1234" 
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "IndUser validation failed: firstName: required",
      });
    });

    test("the response code is 400 and returns an error stating surname is required", async () => {
      let response = await agent
        .post("/api/indUsers")
        .send({ 
          firstName: "John", 
          surname: "", 
          email: "JohnJason@email.com", 
          password: "1234" 
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "IndUser validation failed: surname: required",
      });
    });

    test("the response code is 400 and returns an error stating an email address is required", async () => {
      let response = await agent
        .post("/api/indUsers")
        .send({ 
          firstName: "John", 
          surname: "Jason", 
          email: "", 
          password: "1234" 
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "IndUser validation failed: email: required",
      });
    });

     test("the response code is 400 and returns an error stating a valid email address is required", async () => {
      let response = await agent
        .post("/api/indUsers")
        .send({ 
          firstName: "John", 
          surname: "Jason", 
          email: "JohnJason@", 
          password: "1234" 
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "IndUser validation failed: email: please use a valid email address",
      });
    });

    test("the response code is 400 and returns an error stating a password is required", async () => {
      let response = await agent
        .post("/api/indUsers")
        .send({ 
          firstName: "John", 
          surname: "Jason", 
          email: "JohnJason@mail.com", 
          password: "" 
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "IndUser validation failed: password: required",
      });
    });

    test("the response code is 400 and returns an error stating a valid password is required", async () => {
      let response = await agent
        .post("/api/indUsers")
        .send({ 
          firstName: "John", 
          surname: "Jason", 
          email: "JohnJason@mail.com", 
          password: "123" 
        });
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "IndUser validation failed: password: must be at least 4 characters long",
      });
    });
  });
});
