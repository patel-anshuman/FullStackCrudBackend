const mongoose = require('mongoose');
require("dotenv").config();

//Connect to Mongo DB
const connection = mongoose.connect(process.env.mongoURL);

//Export
module.exports = { connection };