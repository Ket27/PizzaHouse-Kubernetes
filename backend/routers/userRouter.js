const express = require('express')
const userRouter = express.Router();
const { postSignup, loginUser} = require('../controllers/userController');
const protectRoute = require('../middleware/protectRoute');

userRouter
  .route('/signup')
  .post(postSignup)

userRouter
  .route('/login')
  .post(loginUser)

module.exports = userRouter;