const Activity = require('../models/Tracker');

async function createActivity(req, res) {
    try {
        if (!req.body)
            return res.status(400).json('Data not provided correctly');
        let { name, user, type, amount } = req.body;
        const newActivity = new Activity({
            name,
            user,
            type,
            amount,
            date: Date.now(),
        });
        const savedActivity = await newActivity.save();
        return res.status(201).json(savedActivity);
    } catch (error) {
        return res
            .status(500)
            .json({ message: `Error while creating Activity ${error}` });
    }
}

async function getActivity(req, res) {
    try {
        const { name } = req.query;
        let storedActivity = await Activity.find({ user: name });
        res.status(200).json(storedActivity);
    } catch (error) {
        return res
            .status(404)
            .json({ message: `Error while getting Activity ${error}` });
    }
}

async function deleteActivity(req, res) {
    try {
        const id = req.body._id;
        if (!id) return res.status(400).json('Request body not found');
        await Activity.deleteOne({ _id: id });
        res.status(204).json('Activity has been successfully deleted');
    } catch (error) {
        console.log(error);
        return res
            .status(404)
            .json({ message: `Error while deleting Activity ${error}` });
    }
}

module.exports = {
    createActivity,
    getActivity,
    deleteActivity,
};
