const server = require("../../server");
const request = require("supertest");
const db = require("../../spec/mongoMemoryDB");
const OrgUser = require("../../controllers/orgUsersController");

const agent = request.agent(server);
beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe("OrgUser Controller", () => {
    describe("When a client signs up", () => {
        test("the response code is 201 and returns the orgUser details created", async () => {
            const orgUser = {
                organisationName: "Puppies Trust",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ABCabc123!",
            };

            const response = await agent.post(`/api/org-users/signup`).send(orgUser);

            expect(response.statusCode).toBe(201);
            expect(response.body.orgUser).toEqual(
                expect.objectContaining({
                    organisationName: orgUser.organisationName,
                    email: orgUser.email,
                    charityNumber: orgUser.charityNumber,
                })
            );
        });

        it("creates a token when the client successfully create an account", async () => {
            const orgUser = {
                organisationName: "Puppies Trust",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ABCabc123!",
            };

            const response = await agent.post(`/api/org-users/signup`).send(orgUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toEqual(
                expect.objectContaining({
                    token: expect.any(String),
                })
            );
        });

        test("an organisation user 'orgUser' is created in the database", async () => {
            const orgUser = {
                organisationName: "Puppies Trust",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ABCabc123!",
            };

            const signupResponse = await agent
                .post(`/api/org-users/signup`)
                .send(orgUser);
            
            const getOrgUserResponse = await agent.get(`/api/org-users/${signupResponse.body.orgUser._id}`);

            expect(getOrgUserResponse.body.organisationName).toEqual(orgUser.organisationName);
        });
    });

    describe("It display error messages when a client signups with missing or invalid inputs", () => {
        test("response code is 400 when organisationName is missing", async () => {
            let response = await request(server).post(`/api/org-users/signup`).send({
                organisationName: "",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ABCabc123!",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                error: "Please provide an organisation name",
            });
        });

        test("response code is 400 when email address is missing", async () => {
            let response = await request(server).post(`/api/org-users/signup`).send({
                organisationName: "Puppies Trust",
                email: "",
                charityNumber: 123456,
                password: "ABCabc123!",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                error: "Please provide an email address",
            });
        });

        test("response code is 400 when password is missing", async () => {
            let response = await request(server).post(`/api/org-users/signup`).send({
                organisationName: "Puppies Trust",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                error: "Please provide a password",
            });
        });

        test("response code is 400 when password is weak and does not meet the minimum requirement", async () => {
            let response = await request(server).post(`/api/org-users/signup`).send({
                organisationName: "Puppies Trust",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "abc123",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                error:
                    "Password must be 8 characters or longer \nPassword must have at least one digit (0-9) \nPassword must have at least one uppercase ('A'-'Z') \nPassword must have at least one special character ('!\"#$%&'()*+,‑./&')",
            });
        });

        test("response code is 201 when password meets all the requirement of a password", async () => {
            let response = await request(server).post(`/api/org-users/signup`).send({
                organisationName: "Puppies Trust",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ThisIsAStrongPassword1!",
            });
            expect(response.statusCode).toBe(201);
        });

        test("response code is 400 when email address is not valid", async () => {
            let response = await request(server).post(`/api/org-users/signup`).send({
                organisationName: "Puppies Trust",
                email: "incorrectemail@",
                charityNumber: 123456,
                password: "ThisIsAStrongPassword",
            });
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual({
                error: "Please provide a valid email address"
            });
        });

        test("response code is 201 when email address is valid", async () => {
            let response = await request(server).post(`/api/org-users/signup`).send({
                organisationName: "Puppies Trust",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ThisIsAStrongPassword1!",
            });
            expect(response.statusCode).toBe(201);
        });
    });

    describe("Throw error meessages when the client already has an account", () => {
        test("should display 'User already exists' when a client trys to sign up the same email address", async() => {
            const orgUser1 = {
                organisationName: "Puppies Trust 1",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ABCabc123!",
            };

            const orgSignsUp1 = await agent.post(`/api/org-users/signup`).send(orgUser1);

            const orgUser2 = {
                organisationName: "Puppies Trust 2",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ABCabc123!",
            };

            const orgSignsUpAgain = await agent.post(`/api/org-users/signup`).send(orgUser2);
            expect(orgSignsUpAgain.statusCode).toBe(400);
            expect(orgSignsUpAgain.body).toEqual({
                error: "User already exists"
            });
        })
    })

    describe("When the client logs in", () => {
        const orgUser = {
            organisationName: "Puppies Trust 1",
            email: "puppy@gmail.com",
            charityNumber: 123456,
            password: "ABCabc123!",
        };
        
        test("displays an error message if the email address is incorrect", async() => {
            const signupResponse = await agent.post(`/api/org-users/signup`).send(orgUser);
            const orgUserHasAccount = {
                email: "incorrectemail@gmail.com",
                password: "ABCabc123!"
            };

            const loginResponse = await agent.post(`/api/org-users/login`).send(orgUserHasAccount);
            expect(loginResponse.statusCode).toBe(400)
            expect(loginResponse.body).toEqual({
                error: "Incorrect email"
            });
        })

        test("displays an error message if the password is incorrect", async() => {
            const signupResponse = await agent.post(`/api/org-users/signup`).send(orgUser);
            const orgUserHasAccount = {
                email: "puppy@gmail.com",
                password: "incorrectPassword"
            };

            const loginResponse = await agent.post(`/api/org-users/login`).send(orgUserHasAccount);

            expect(loginResponse.statusCode).toBe(400)
            expect(loginResponse.body).toEqual({
                error: "Incorrect password"
            });
        })

        test("displays an error message when email address and password have not been submitted", async() => {
            const signupResponse = await agent.post(`/api/org-users/signup`).send(orgUser);
            const orgUserHasAccount = {
                email: "",
                password: ""
            };

            const loginResponse = await agent.post(`/api/org-users/login`).send(orgUserHasAccount);

            expect(loginResponse.statusCode).toBe(400)
            expect(loginResponse.body).toEqual({
                error: "Please complete all required fields"
            });
        })

        test("response code is 200 when email and password matches record", async() => {
            const signupResponse = await agent.post(`/api/org-users/signup`).send(orgUser);
            const orgUserHasAccount = {
                email: "puppy@gmail.com",
                password: "ABCabc123!"
            };

            const loginResponse = await agent.post(`/api/org-users/login`).send(orgUserHasAccount);

            expect(loginResponse.statusCode).toBe(200)
            expect(loginResponse.body).toEqual({
                type: "org",
                email: "puppy@gmail.com",
                id: expect.any(String),
                token: expect.any(String)
            });
        })
    })

    describe("Get All Org Users", () => {
        test("returns list of all org in alphabetical order", async () => {
            await agent.post(`/api/org-users/signup`).send({
                organisationName: "Puppies Trust",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ABCabc123!",
            });
            await agent.post(`/api/org-users/signup`).send({
                organisationName: "Age UK",
                email: "admin@age.com",
                charityNumber: 123456,
                password: "ABCabc123!",
            });
            await agent.post(`/api/org-users/signup`).send({
                organisationName: "Ealing Church",
                email: "admin@ealingchurch.com",
                charityNumber: null,
                password: "ABCabc123!",
            });

            const response = await agent.get('/api/org-users')
            expect(response.statusCode).toBe(200);
            const list = response.body.map(org => org.organisationName);
            expect(list).toEqual([ 'Age UK', 'Ealing Church', 'Puppies Trust' ]);
        });
    });

    describe("Updates org user info", () => {
        test("returns list of all org in alphabetical order", async () => {
            const newUserResponse = await agent.post(`/api/org-users/signup`).send({
                organisationName: "Puppies Trust",
                email: "puppy@gmail.com",
                charityNumber: 123456,
                password: "ABCabc123!",
            });
            const orgId = newUserResponse.body.orgUser._id;
            let orgInfoResult = newUserResponse.body.orgUser.info;
            expect(orgInfoResult).toEqual([]);

            const updateInfoResponse = await agent.post('/api/org-users/update-info').send({
                orgUserId: orgId,
                missionStatement: 'Bla bla bla',
                websiteUrl: 'www.web.com',
                logoUrl: 'www.logo.png',
                address: '1 Battersea Place'
            });
            expect(updateInfoResponse.statusCode).toBe(201);

            orgInfoResult = updateInfoResponse.body.orgUser.info[0];
            expect(orgInfoResult).toEqual(
                expect.objectContaining({
                    missionStatement: 'Bla bla bla',
                    websiteUrl: 'www.web.com',
                    logoUrl: 'www.logo.png',
                    address: '1 Battersea Place'
                })
            );
        });
    });
});
