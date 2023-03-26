const mongoose = require('mongoose');

//Defining Structure (Schema) with Validation
const todoSchema = mongoose.Schema({
    task:{ type: String, required: true },
    status: { type: Boolean, required: true },
    userID: { type: String, required: true }
},{
    versionKey: false
});
//Defining Structure (Model)
const TodoModel = mongoose.model("todo",todoSchema) //collection name(singular), schema var name

//Export
module.exports = { TodoModel };