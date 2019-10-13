const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bookingSchema = require('./bookings').schema;
const busSchema = new Schema({
    departureTime: Number,
    arrivalTime: Number,
    fare: Number,
    capacity: Number,
    availableSeats: [Number],
    reservedSeats: [Number],
    source: String,
    destination: String,

});

const Bus = mongoose.model('Bus', busSchema);
module.exports = Bus;
