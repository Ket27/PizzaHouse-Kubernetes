const reviewModel = require("../models/reviewModel");

module.exports.postReview = async(req,res) => {
    try{
        const {plan} = req.params;
        const {review, rating} = req.body;
        const newReview = await reviewModel.create({pizza:plan, review, rating});
        res.status(201).json({ 
            success: true, 
            data: newReview,
        });
    }
    catch{
        res.status(500).json({
            success: false,
            error: "error.message",
        });
    }
}

module.exports.getReviews = async(req,res) => {
    try{
        const { id } = req.params;
        const reviews = await reviewModel.find({pizza:id});
        res.status(200).json({ success: true, data: reviews });
   }
    catch{
        res.status(500).json({ success: false, error: "error.message" })
    }
}

