const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    review : {
        type:String,
        default:null,
    },

    rating : {
        type:Number,
        min:0,
        max:5,
    },

    createdAt:{
        type:Date,
        default:Date.now(),
    },

    pizza:{
        type:mongoose.Schema.ObjectId,
        ref:'pizzaModel',
    }
})

reviewSchema.pre(/^find/, function(next) {
    this.populate("pizza");
    next();
})

const reviewModel = mongoose.model("reviewModel", reviewSchema);

module.exports = reviewModel;