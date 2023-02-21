require('dotenv').config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const express = require('express');

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});
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