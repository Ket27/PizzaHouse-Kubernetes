const jwt = require("jsonwebtoken");
const userModel = require('../models/userModel')

module.exports = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        const verify = jwt.verify(token, process.env.JWT_KEY);
        console.log(verify)
        const user = await userModel.findById(verify.id);
    }
    catch{
        res.json({
            message: "error"
        })
    }
}