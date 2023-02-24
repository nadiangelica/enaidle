require('dotenv').config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const express = require('express');
const listingRoutes = require('./routes/listings');
const orgUserRoutes = require('./routes/orgUsers');
const indUserRoutes = require('./routes/indUsers');

// express app
const app = express();

// middleware
app.use(express.json());

// Loggin middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// // CORS
// const cors = require('cors');
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true,
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));

// routes
app.use('/api/orgUsers', orgUserRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/indUsers', indUserRoutes);

// listen for requests
if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(process.env.PORT, () => {
                console.log('connected to db & listening on port', process.env.PORT);
            })
        })
        .catch((error) => {
            console.log(error);
    });
}


module.exports = app;