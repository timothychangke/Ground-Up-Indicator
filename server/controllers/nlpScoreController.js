const NLPScore = require('../models/NLPScore');


const postReflection = async (req, res) => {
    const {
        email,
        score
    } = req.body;
    const event = await NLPScore.findOne({email: email});
    if (event == null){
        const data = await NLPScore.create({
            email:email,
            scoreArray:[score]
        })
        res.status(200).json(data)
    }else{
            event.scoreArray.push(score)
            await event.save();
    }
    res.status(200).json(event)
};

const getReflection = async(req,res)=>{
    const email = req.query.email;
    console.log(email)
    const score = await NLPScore.findOne({email:email});
    console.log(score)
    res.status(200).json(score)
}

module.exports = {postReflection,getReflection}