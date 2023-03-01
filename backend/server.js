require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const express = require("express");
const listingRoutes = require("./routes/listings");
const orgUserRoutes = require("./routes/orgUsers");
const indUserRoutes = require('./routes/indUsers');
const inMemoryDb = require("./spec/mongoMemoryDB");

// express app
const app = express();

// middleware
app.use(express.json());

// Login middleware
app.use((req, res, next) => {
  req.path, req.method;
  // Comment out console log as it was noise - console.logging all the tests path routes -
  // console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/org-users", orgUserRoutes);
app.use("/api/listings", listingRoutes);
app.use('/api/ind-users', indUserRoutes);

if (process.env.NODE_ENV !== "test") {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log("connected to db & listening on port", process.env.PORT);
      });
    })
    .catch((error) => {
      console.log(error);
    });
} 
// else {
//   // mock mongo db
//   inMemoryDb
//     .connect()
//     .then(() => {
//       app.listen(process.env.PORT, () => {
//         console.log(
//           "connected to test db & listening on port",
//           process.env.PORT
//         );
//       });
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// listen for requests
module.exports = app;
