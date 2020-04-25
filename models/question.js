const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    optionA: {
        type: String,
        required: true
    },
    optionB: {
        type: String,
        required: true
    },
    optionC: {
        type: String,
        required: true
    },
    optionD: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Question", questionSchema);