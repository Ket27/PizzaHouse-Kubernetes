const express = require('express')
const pizzaRouter = express.Router();
const { postPizza, loginUser, getPizzas, getOnePizza} = require("../controllers/pizzaController");

pizzaRouter
  .route('/post')
  .post(postPizza)

pizzaRouter
  .route('/get')
  .get(getPizzas)

pizzaRouter
  .route('/getPizza/:id')
  .get(getOnePizza)


module.exports = pizzaRouter
