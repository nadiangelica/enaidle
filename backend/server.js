require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const express = require('express');
const listingRoutes = require('./routes/listings')
const orgUserRoutes = require('./routes/orgUsers');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/orgUsers', orgUserRoutes);
app.use('/api/listings', listingRoutes)

// listen for requests
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'test') {
    console.log("helooasfdasdfads");
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log('connected to db & listening on port', process.env.PORT);
            })
        })
<<<<<<< HEAD
        .catch((error) => {
            console.log(error);
    });
}
=======
    })
    .catch((error) => {
        console.log(error);
});
>>>>>>> origin/main

module.exports = app;