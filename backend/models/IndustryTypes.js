const mongoose = require('mongoose');

const industryTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const IndustryType = mongoose.model('IndustryType', industryTypeSchema);

module.exports = IndustryType;
