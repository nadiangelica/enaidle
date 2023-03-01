const mongoose = require("mongoose");
const db = require("../../spec/mongoMemoryDB");

const { Comment } = require("../../models/commentModel");
const { ObjectId } = mongoose.Types;


describe("Comment model", () => {
  beforeAll(async () => await db.connect());
  beforeEach(async () => await db.clear());
  afterAll(async () => await db.close());

  test('has a user name', () => {
    const myComment = new Comment({
      userName: "Bob",
      content: "Hello World!",
    });

    expect(myComment.userName).toEqual("Bob");
  })

  test('has a content', () => {
    const myComment = new Comment({
      userName: "Bob",
      content: "Hello World!",
    });

    expect(myComment.content).toEqual("Hello World!");
  })
});
