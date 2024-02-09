const mongoose = require('mongoose');

const activityScehma = new mongoose.Schema({
    name: { type: String, default: 'Activty' },
    user: { type: String },
    type: { type: String, default: 'Transportation' },
    amount: { type: String },
    startDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
});

const ActivityModel = mongoose.model('activity', activityScehma);
module.exports = ActivityModel;
