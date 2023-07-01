const express = require('express')
const pizzaRouter = express.Router();
const { postPizza, loginUser} = require("../controllers/pizzaController");

pizzaRouter
  .route('/post')
  .post(postPizza)

pizzaRouter
  .route('/get')
  .get(getPizzas)

module.exports = pizzaRouter
