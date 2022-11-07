const mongoose = require('mongoose');
const Subject = require('./subject')

const daySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject'
        }
    ]  
})

module.exports = mongoose.model('Day', daySchema)