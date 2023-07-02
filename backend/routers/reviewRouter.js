const express = require('express')
const reviewRouter = express.Router();
const { postReview, getReviews} = require("../controllers/reviewController");

reviewRouter
  .route('/create/:plan')
  .post(postReview)

reviewRouter
  .route('/get/:id')
  .get(getReviews)

module.exports = reviewRouter