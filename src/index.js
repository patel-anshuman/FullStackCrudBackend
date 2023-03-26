const express = require('express');
require('dotenv').config();
const cors = require('cors');
const {connection} = require('../database/db');
const userRoute = require('../routes/user.route')
const {auth} = require("../middlewares/auth.middleware")
const todoRoute = require('../routes/todo.route');
const port = process.env.PORT || 4000;

//Created App
const app = express();
app.use(express.json());
app.use(cors());

app.use('/users',userRoute)     //User route
app.use(auth);              //Authorisation middleware
app.use('/todos',todoRoute);    //Todo route

//Running server and connecting to Mongo Atlas
app.listen(port, async() => {
    try {
        await connection;
        console.log("Connected to Mongo Atlas DB");
    } catch (err) {
        console.log("Couldn't connect to Mongo Atlas");
        console.log(err);
    }
    console.log(`Server is running at port ${port}`);
});

//Export App
module.exports = app;