const {Router} = require('express');
const {TodoModel} = require('../models/todo.model');
const jwt = require('jsonwebtoken');

const todo = Router();

//Read TODO Data
todo.get('/',async (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,"tony")
    try {
        if(decoded) {
            const todoData = await TodoModel.find({userID:decoded.userID});
            if(todoData.length>0){
                res.status(200).send(todoData)
            } else {
                res.status(400).send({msg:"No tasks"});
            }
        } else {
            res.status(400).send({msg:"Invalid Token !!"});
        }
    } catch (err) {
        res.status(400).send({msg:err.message});
    }
});

//Create TODO Data
todo.post('/create',async (req,res) => {
    const payload = req.body;
    try {
        const data = new TodoModel(payload);
        await data.save();
        res.status(200).send({msg:"New data added"});
    } catch (err) {
        res.status(400).send({msg:err.message});
    }
})

//Update TODO Data
todo.patch('/:todoId',async (req,res) => {
    const id = Number(req.params.todoId);
    const payload = req.body;
    try {
        await TodoModel.findByIdAndUpdate({_id:id},payload);
        res.status(200).send({msg:"New data updated"});
    } catch (err) {
        res.status(400).send({msg:err.message});
    }
})

//Delete TODO Data
todo.delete('/:todoId',async (req,res) => {
    const id = req.params.todoId;
    try {
        await TodoModel.findByIdAndDelete({_id:id});
        res.status(200).send({msg:"Data deleted"});
    } catch (err) {
        res.status(400).send({msg:err.message});
    }
})

//Export route
module.exports = todo;