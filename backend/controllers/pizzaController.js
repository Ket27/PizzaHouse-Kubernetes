const express = require("express")
const pizzaModel = require("../models/pizzaModel");

module.exports.postPizza = async(req,res) => {
    const {name, description, nonVeg, price, ratingsAverage} = req.body;

    //if "Cannot set headers after they are sent to the client" error comes remove the next 5 lines from 8 to 12
    if(!name || !description || !nonVeg || !price || !ratingsAverage){
        res.json({
            message : "fill all the details",
        })
    }

    const ispizzaexist = await pizzaModel.findOne({name});
    if(ispizzaexist){
        res.json({
            message : "pizza already exists",
        })
    }

    else{
        const pizza = await pizzaModel.create({name, description, nonVeg, price, ratingsAverage});

        if(pizza){
            res.json({
                message : "pizza created",
                _id : pizza._id,
                name : pizza.name,
                description : pizza.description,
                nonVeg : pizza.nonVeg,
                price : pizza.price,
                ratingsAverage : pizza.ratingsAverage,
            })
        }

        else{
            res.json({
                message : 'Not able to load',
            })
        }
    }
}

module.exports.getPizzas = async(req,res) =>{
    try{
        const pizzas = await pizzaModel.find({});
        if(pizzas){
            res.json({
            message:"pizzas fetched",
            data: pizzas,
        })
        }
        else{
            res.json({
                message:'no pizzas found',
            })
        }
    }
    catch{
        res.status(500).json({ error: 'Failed to fetch pizzas' });
    }
}

module.exports.getOnePizza = async(req, res) => {
    try
    {const {id} = req.params;
    const pizza = await pizzaModel.findById(id);
    if(pizza){
        res.json({
        message:"pizza found",
        data:pizza,
    })
    }
    else{
        res.json({
            message:"sorry",
        })
    }}
    
        catch{
            res.status(500).json({ error: 'Failed to fetch pizzas' });
        }
    
    
}
