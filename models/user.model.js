const mongoose = require('mongoose');

//Defining Structure (Schema) with Validation
const userSchema = mongoose.Schema({
    email: String,
    pass: String,
    location: String,
    age: Number
},{
    versionKey: false
});
//Defining Structure (Model)
const UserModel = mongoose.model("user",userSchema) //collection name(singular), schema var name

//Export
module.exports = { UserModel };