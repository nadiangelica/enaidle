// var mongoose = require("mongoose");
// mongoose.set('strictQuery', true)
// beforeAll(function (done) {
//     // console.log(process.env.MONGO_URI)
//   mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   var db = mongoose.connection;
//   db.on("error", console.error.bind(console, "MongoDB connection error:"));
//   db.on("open", function () {
//     done();
//   });
// });

// afterAll(function (done) {
//   mongoose.connection.close(true, function () {
//     done();
//   });
// });

const {MongoClient} = require('mongodb');

  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db(globalThis.__MONGO_DB_NAME__);
  });

  afterAll(async () => {
    await connection.close();
  });
