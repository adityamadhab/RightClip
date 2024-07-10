const mongoose = require('mongoose');

const projectCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    templateImage: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const ProjectCategory = mongoose.model('ProjectCategory', projectCategorySchema);

module.exports = ProjectCategory;
