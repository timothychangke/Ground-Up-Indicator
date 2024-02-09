const Score = require('../models/Score');


const updateScores = async (req, res) => {
    const {
        email,
        dateArray,
        natureScoreArray,
        carbonScoreArray,
        nlpScoreArray,
    } = req.body;
    const score = await Score.findOne({email: email});
    console.log(score)
    if (score == null){
        const event = await Score.create({
            email:email,
            dateArray:[dateArray],
            natureScoreArray:[natureScoreArray],
            carbonScoreArray:[carbonScoreArray],
            nlpScoreArray:[nlpScoreArray]
        })
        res.status(200).json(event)
    }else{
            score.dateArray.push(dateArray);
            score.natureScoreArray.push(natureScoreArray);
            score.carbonScoreArray.push(carbonScoreArray);
            score.nlpScoreArray.push(nlpScoreArray);
            await score.save();
    }
    res.status(200).json(score)
};

const getScores = async(req,res)=>{
    const {email} = req.body
    const score = await Score.findOne({email:email});
    res.status(200).json(score)

}

const getAllScores= async(req,res)=>{
    const score = await Score.find({})
    res.status(200).json(score)
}

module.exports = {updateScores,getScores, getAllScores}