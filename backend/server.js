require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const express = require('express');
const listingRoutes = require('./routes/listings')

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/listings', listingRoutes)


// listen for requests
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
});