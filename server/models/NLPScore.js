const mongoose = require("mongoose");

const {Schema} = mongoose

const nlpScoreSchema = new Schema ({
    email:{
        type: String,
    },
    scoreArray:{
        type: [Number]
    }
});


const NLPScoreModel = mongoose.model('NLPScore', nlpScoreSchema)
module.exports = NLPScoreModel