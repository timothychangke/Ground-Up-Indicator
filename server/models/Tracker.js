const mongoose = require('mongoose');

const activityScehma = new mongoose.Schema({
    name: { type: String, default: 'Activty' },
    user: { type: String },
    type: { type: String, default: 'Transportation' },
    amount: { type: String },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const ActivityModel = mongoose.model('activity', activityScehma);
module.exports = ActivityModel
