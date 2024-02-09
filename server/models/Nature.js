const mongoose = require("mongoose");
const ScoreModel = require("./Score");

const {Schema} = mongoose

const natureSchema = new Schema ({
    email: {
        type: String,
    },
    activity: {
        type: String,
        required: true,
    },
    startDate:{
        type: Date,
    },
    endDate:{
        type: Date,
    },
    duration:{
        type: Number,
        required: true,
    },
});

const NatureModel = mongoose.model('Nature', natureSchema)
module.exports = NatureModel