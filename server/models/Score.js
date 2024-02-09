const mongoose = require("mongoose");

const {Schema} = mongoose

const scoreSchema = new Schema ({
    email:{
        type: String,
    },
    dateArray:{
        type: [Date],

    },
    natureScoreArray:{
        type: [Number],

    },
    carbonScoreArray:{
        type:[Number],

    },
    nlpScoreArray:{
        type:[Number],

    }
});


const ScoreModel = mongoose.model('Score', scoreSchema)
module.exports = ScoreModel