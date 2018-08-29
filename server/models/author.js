const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: [16, 'that young really???'],
        max: 99
    }
})

module.exports = mongoose.model('Author', authorSchema)