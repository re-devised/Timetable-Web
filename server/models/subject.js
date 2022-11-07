const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        default: ""
    },
    room: {
        type: String,
        default: ""
    }
})

module.exports = mongoose.model('Subject', subjectSchema)