const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    date: {
        required: true,
        type: Date
    },
    seatNumber: [{
        required: true,
        type: Number
    }],
        
    
    movie: {
        type: String,
        required: true
    },
     
    
     
})

module.exports = mongoose.model('Booking', dataSchema)