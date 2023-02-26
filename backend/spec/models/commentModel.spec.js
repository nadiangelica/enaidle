// const mongoose = require("mongoose");
// require("./mongodb_helper");

// const { ObjectId } = mongoose.Types;

// const { Comment } = require("../../models/commentModel");

// describe("Comment model", () => {
//   beforeEach((done) => {
//     mongoose.connection.collections.comments.drop(() => {
//       done();
//     });
//   });

//   const myComment = new Comment({
//     orgUser_id: "someFakeId",
//     indUser_id: "",
//     listing_id: "someFakeListingId",
//     content: "Hello World!",
//   });

//   test("has a user_id, can be 'orgUser' or 'IndUser'", () => {
//     expect(myComment.orgUser_id).toEqual("someFakeId");
//   });

//   // test("has the id of the listing ad", () => {
//   //   expect(myComment.listing_id).toEqual("someFakeListingId");
//   // });

//   // test("has a comment", () => {
//   //   expect(myComment.content).toEqual("Hello World!");
//   // });
// });
