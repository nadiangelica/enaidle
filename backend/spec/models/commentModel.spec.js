const mongoose = require("mongoose");
const db = require("../../spec/mongoMemoryDB");

const { Comment } = require("../../models/commentModel");
const { ObjectId } = mongoose.Types;


describe("Comment model", () => {
  beforeAll(async () => await db.connect());
  beforeEach(async () => await db.clear());
  afterAll(async () => await db.close());

  test('has an orgUser', () => {
    const myComment = new Comment({
      orgUser_id: "12334693",
      indUser_id: "",
      content: "Hello World!",
    });

    expect(myComment.orgUser_id).toEqual("12334693");
  })

  test('has a indUser', () => {
    const myComment = new Comment({
      orgUser_id: "",
      indUser_id: "32764837",
      content: "Hello World!",
    });

    expect(myComment.indUser_id).toEqual("32764837");
  })

  test('has a content', () => {
    const myComment = new Comment({
      orgUser_id: "",
      indUser_id: "32764837",
      content: "Hello World!",
    });

    expect(myComment.content).toEqual("Hello World!");
  })
});
