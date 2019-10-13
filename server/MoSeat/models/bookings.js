const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    source: String,
    destination: String,
    journeyDate: String,
    numberOfSeats: Number,
    seatNumbers: [Number],
    busId: {
        type: Schema.Types.ObjectId,
        ref: "Bus"
    }
});


const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;