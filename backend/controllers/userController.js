const userModel = require('../models/userModel')
const generateToken = require("../config/generateToken")
const bcrypt = require('bcryptjs')

module.exports.postSignup = async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password){
        res.status(400).json({
            message : "All info. not filled",
        })
    }

    const isUserExist = await userModel.findOne({email});

    if(isUserExist){
        res.json({
            message : "User Already Exist",
        })
    }

    else{
        const user = await userModel.create({name, email, password});

        if(user){
            res.json({
                message : 'User Signed Up',
                _id : user._id,
                name : user.name,
                email : user.email, 
                token : generateToken(user._id),
            })
        }

        else {
            res.json({
                message : 'Not able to sign up',
            })
        }
    }
}

module.exports.loginUser = async (req,res) => {
    const {email, password} = req.body;
    const user = await userModel.findOne({email});

    if(user){
        if(await user.matchPassword(password)){
            let token = generateToken(user._id);
            res.cookie("isLoggedIn", token, {httpOnly : true})
            res.json({
                message : 'user logged in',
                _id : user._id,
                name : user.name,
                email : user.email, 
                token : generateToken(user._id),
            })
        }
        else{
            res.json({message:"password not same"})
        }
    }

    else{
        res.json ({
            message : 'No user found',
        })
    }
} 

