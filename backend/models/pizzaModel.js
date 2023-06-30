const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema({
    name : {
        type:String,
        required:true,
    },

    description : {
        type:String,
        required : true,
    },

    nonVeg:{
        type:Boolean,
        required:true,
        default:false,
    },

    price:{
        type:Number,
        required:true,
    },

    ratingsAverage:{
        type:Number,
        required:true,
    }

})

const pizzaModel = mongoose.model("pizzaModel", pizzaSchema);

module.exports = pizzaModel;