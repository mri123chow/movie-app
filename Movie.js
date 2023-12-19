const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        required: true,
        type: String
    },
    releaseDate: {
        type: Date,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    actors: [{
        type: String,
        required: true
    }],
    ticketPrice:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Movie', dataSchema)