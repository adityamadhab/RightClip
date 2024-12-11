const mongoose = require('mongoose');

const pointSettingsSchema = new mongoose.Schema({
    earningsPerProject: {
        type: Number,
        required: true,
    },
    qualityScorePerProject: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PointSettings', pointSettingsSchema); 