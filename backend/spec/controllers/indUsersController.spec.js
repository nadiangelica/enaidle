const server = require("../../server");
const request = require("supertest");
const db = require("../../spec/mongoMemoryDB");
const IndUser = require("../../controllers/indUsersController");

const agent = request.agent(server);
// Comment line 8 and line 10 as it's causing conflicts, saying we're trying to establish 2 database connections when it can only listen to one
// beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
// afterAll(async () => await db.close());

describe("IndUser Controller", () => {
  describe("When an individual signs up", () => {
    test("the response code is 201 and returns the indUser details created", async () => {
      const indUser = {
        firstName: "Anna",
        lastName: "Smith",
        email: "annas@gmail.com",
        password: "ABCabc123!",
      };

      const response = await agent.post(`/api/indUsers/signup`).send(indUser);

      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(
        expect.objectContaining({
          firstName: indUser.firstName,
          lastName: indUser.lastName,
          email: indUser.email,
          password: indUser.password,
        })
      );
    });

  //   it("creates a token when the individual successfully creates an account", async () => {
  //     const indUser = {
  //       firstName: "Anna",
  //       lastName: "Smith",
  //       email: "annas@gmail.com",
  //       password: "ABCabc123!",
  //     };

  //     const response = await agent.post(`/api/indUsers/signup`).send(indUser);

  //     expect(response.statusCode).toBe(201);
  //     expect(response.body).toEqual(
  //       expect.objectContaining({
  //         token: expect.any(String),
  //       })
  //     );
  //   });

  //   test("an individual user 'indUser' is created in the database", async () => {
  //     const indUser = {
  //       firstName: "Anna",
  //       lastName: "Smith",
  //       email: "annas@gmail.com",
  //       password: "ABCabc123!",
  //     };

  //     const signupResponse = await agent
  //       .post(`/api/indUsers/signup`)
  //       .send(indUser);
      
  //     const getIndUserResponse = await agent.get(`/api/indUsers/${signupResponse.body._id}`);

  //     expect(getIndUserResponse.body).toEqual({
  //       firstName: getIndUserResponse.firstName,
  //       lastName: getIndUserResponse.lastName,
  //     });
  //   });
  // });

  // describe("It displays error messages when an individual signs up with missing or invalid inputs", () => {
  //   test("response code is 400 when firstName is missing", async () => {
  //     let response = await request(server).post(`/api/indUsers/signup`).send({
  //         firstName: "",
  //         lastName: "Smith",
  //         email: "annas@gmail.com",
  //         password: "ABCabc123!",
  //     });
  //     expect(response.statusCode).toBe(400);
  //     expect(response.body).toEqual({
  //       error: "Please provide a first name",
  //     });
  //   });

  //   test("response code is 400 when lastName is missing", async () => {
  //     let response = await request(server).post(`/api/indUsers/signup`).send({
  //         firstName: "Anna",
  //         lastName: "",
  //         email: "annas@gmail.com",
  //         password: "ABCabc123!",
  //     });
  //     expect(response.statusCode).toBe(400);
  //     expect(response.body).toEqual({
  //       error: "Please provide a last name",
  //     });
  //   });

  //   test("response code is 400 when email address is missing", async () => {
  //     let response = await request(server).post(`/api/indUsers/signup`).send({
  //       firstName: "Anna",
  //       lastName: "Smith",
  //       email: "",
  //       password: "ABCabc123!",
  //     });
  //     expect(response.statusCode).toBe(400);
  //     expect(response.body).toEqual({
  //       error: "Please provide an email address",
  //     });
  //   });

  //   test("response code is 400 when password is missing", async () => {
  //     let response = await request(server).post(`/api/indUsers/signup`).send({
  //       firstName: "Anna",
  //       lastName: "Smith",
  //       email: "annas@gmail.com",
  //       password: "",
  //     });
  //     expect(response.statusCode).toBe(400);
  //     expect(response.body).toEqual({
  //       error: "Please provide a password",
  //     });
  //   });

  //   test("response code is 400 when password is weak and does not meet the minimum requirement", async () => {
  //     let response = await request(server).post(`/api/indUsers/signup`).send({
  //       firstName: "Anna",
  //       lastName: "Smith",
  //       email: "annas@gmail.com",
  //       password: "password",
  //     });
  //     expect(response.statusCode).toBe(400);
  //     expect(response.body).toEqual({
  //       error:
  //         "Password must be 8 characters or longer \nPassword must have at least one digit (0-9) \nPassword must have at least one uppercase ('A'-'Z') \nPassword must have at least one special character ('!\"#$%&'()*+,‑./&')",
  //     });
  //   });

  //   test("response code is 201 when password meets all the requirement of a password", async () => {
  //     let response = await request(server).post(`/api/indUsers/signup`).send({
  //       firstName: "Anna",
  //       lastName: "Smith",
  //       email: "annas@gmail.com",
  //       password: "ThisIsAStrongPassword123!",
  //     });
  //     expect(response.statusCode).toBe(201);
  //   });

  //   test("response code is 400 when email address is not valid", async () => {
  //     let response = await request(server).post(`/api/indUsers/signup`).send({
  //       firstName: "Anna",
  //       lastName: "Smith",
  //       email: "annas@gmail",
  //       password: "ThisIsAStrongPassword123!",
  //     });
  //     expect(response.statusCode).toBe(400);
  //     expect(response.body).toEqual({
  //       error: "Please provide a valid email address"
  //     });
  //   });

  //   test("response code is 201 when email address is valid", async () => {
  //     let response = await request(server).post(`/api/indUsers/signup`).send({
  //       firstName: "Anna",
  //       lastName: "Smith",
  //       email: "annas@gmail.com",
  //       password: "ThisIsAStrongPassword123!",
  //     });
  //     expect(response.statusCode).toBe(201);
  //   });
  // });

  // describe("Throw error meessages when the individual already has an account", () => {
  //   test("should display 'User already exists' when an individual tries to sign up with the same email address", async() => {
  //     const indUser1 = {
  //       firstName: "Anna",
  //       lastName: "Smith",
  //       email: "annas@gmail.com",
  //       password: "ThisIsAStrongPassword123!",
  //     };

  //     const indSignsUp1 = await agent.post(`/api/indUsers/signup`).send(indUser1);

  //     const indUser2 = {
  //       firstName: "Ana",
  //       lastName: "Sood",
  //       email: "annas@gmail.com",
  //       password: "ThisIsAStrongPassword1@",
  //     };

  //     const indSignsUpAgain = await agent.post(`/api/indUsers/signup`).send(indUser2);
  //     expect(indSignsUpAgain.statusCode).toBe(400);
  //     expect(indSignsUpAgain.body).toEqual({
  //       error: "User already exists"
  //     });
  //   })
  // })

  // describe("When the individual logs in", () => {
  //   const indUser = {
  //     firstName: "Anna",
  //     lastName: "Smith",
  //     email: "annas@gmail.com",
  //     password: "ThisIsAStrongPassword123!",
  //   };
    
  //   test("displays an error message if the email address is incorrect", async() => {
  //     const signupResponse = await agent.post(`/api/indUsers/signup`).send(indUser);
  //     const indUserHasAccount = {
  //       email: "incorrectemail@gmail.com",
  //       password: "ThisIsAStrongPassword123!"
  //     };

  //     const loginResponse = await agent.post(`/api/indUsers/login`).send(indUserHasAccount);
  //     expect(loginResponse.statusCode).toBe(400)
  //     expect(loginResponse.body).toEqual({
  //       error: "Incorrect email"
  //     });
  //   })

  //   test("displays an error message if the password is incorrect", async() => {
  //     const signupResponse = await agent.post(`/api/indUsers/signup`).send(indUser);
  //     const indUserHasAccount = {
  //       email: "annas@gmail.com",
  //       password: "incorrectPassword"
  //     };

  //     const loginResponse = await agent.post(`/api/indUsers/login`).send(indUserHasAccount);

  //     expect(loginResponse.statusCode).toBe(400)
  //     expect(loginResponse.body).toEqual({
  //       error: "Incorrect password"
  //     });
  //   })

  //   test("displays an error message when email address and password have not been submitted", async() => {
  //     const signupResponse = await agent.post(`/api/indUsers/signup`).send(indUser);
  //     const indUserHasAccount = {
  //       email: "",
  //       password: ""
  //     };

  //     const loginResponse = await agent.post(`/api/indUsers/login`).send(indUserHasAccount);

  //     expect(loginResponse.statusCode).toBe(400)
  //     expect(loginResponse.body).toEqual({
  //       error: "Please provide an email and password"
  //     });
  //   })

  //   test("response code is 200 when email and password match record", async() => {
  //     const signupResponse = await agent.post(`/api/indUsers/signup`).send(indUser);
  //     const indUserHasAccount = {
  //       email: "annas@gmail.com",
  //       password: "ThisIsAStrongPassword123!"
  //     };

  //     const loginResponse = await agent.post(`/api/indUsers/login`).send(indUserHasAccount);

  //     expect(loginResponse.statusCode).toBe(200)
  //     expect(loginResponse.body).toEqual({
  //       email: "annas@gmail.com",
  //       token: expect.any(String)
  //     });
  //   })
  })
});
