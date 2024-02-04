const Nature = require('../models/Nature')


const createNature = async(req,res)=>{
    try{
        const { email, activity, startDate, endDate, duration} = req.body;
        const event = await Nature.create({
            email,activity,startDate,endDate,duration
        })
        return res.status(200).json(event);
    } 
    catch (err){
        return res.status(400).json(err);
    }
}

const getAllNature = async(req,res)=>{
    try{
        const email = req.body;
        const event = await Nature.find({email: email}).sort({createdAt:-1})
        return res.status(200).json(event)
    } catch (err){
        return res.status(400).json(err)
    }
}

const getSingleNature = async (req,res)=>{
    try{
        const id = req.params;
        const event = await Nature.findOne({_id: id})
        return res.status(200).json(event)
    } catch (err){
        return res.status(400).json(err)
    }
}

const deleteSingleNature= async (req,res)=>{
    try{
        const id = req.params;
        const event = await Nature.findOneAndDelete({_id:id})
        res.status(200).json(event)
    } catch(err){
        res.status(400).json(err)
    }
}

const deleteAllNature = async (req,res)=>{
    try{
        const email = req.body;
        const event = await Nature.deleteMany({email:email})
        res.status(200).json(event)
    } catch(err){
        res.startDate(400).json(err)
    }
}


module.exports = {
    createNature,getAllNature,getSingleNature,deleteSingleNature, deleteAllNature
};