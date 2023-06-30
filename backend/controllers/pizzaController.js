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