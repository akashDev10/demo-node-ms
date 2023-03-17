const express = require("express");
const mongoose = require("mongoose");
//const openAi = require("./openai/openai");
const dotenv = require('dotenv');
const router = require('./routes/apis')
require('dotenv').config();

const mongoString = process.env.DATABASE_URL;
const port = process.env.PORT;

const app = express();

app.use(express.json());

app.use("/api", router);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.listen(port, () => {
    console.log(`Server Started at`,port)
})