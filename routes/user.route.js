const {Router} = require('express');
const {UserModel} = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userRouter = Router();

//Register
userRouter.post('/register', async (req,res) => {
    const {email, pass, location, age} = req.body;
    try {
        bcrypt.hash(pass, 5, async (err, hash) => {
            const user = new UserModel({email, pass:hash, location, age});
            await user.save();
            res.status(200).send({"msg":"User registration successful!!"});
        });
    } catch (err) {
        res.status(400).send({"msg":err.message});
    }
});

//Login
userRouter.post('/login', async (req,res) => {
    const {email, pass} = req.body;
    try {
        const user = await UserModel.findOne({email,pass});
        if(user){
            bcrypt.compare(pass, user.pass, (err, result) => {
                if(result){
                    res.status(200).send({
                        "msg": "Login Successful!!",
                        "token":jwt.sign({"userID":user._id}, 'tony', { expiresIn: '1h' })
                    });
                } else {
                    res.status(400).send({"msg": "Wrong credentials !"});
                }
            });
        } else {
            res.status(400).send({"msg":"Login Failed!!"});
        }
    } catch (err) {
        res.status(400).send({"msg":err.message});
    }
});


//Export route
module.exports = userRouter;