const express = require("express");
const router = express.Router();
const Booking = require('../models/bookings');
const Bus = require('../models/bus');
const passport = require("passport");


router.get("/new", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.send("Book now");
})
router.post("/new", passport.authenticate("jwt",{ session: false }),(req, res) => {
    if(!req.user){
        return res.status(404).json({'message':'User not found'})
    } else {
    const source = req.body.source;
    const destination = req.body.destination;
    const formatDate = new Date(req.body.journeyDate);
    const journeyDate = formatDate.toUTCString();
    const numberOfSeats = parseInt(req.body.numberOfSeats);
    const bookingDetail = {
        source,
        destination,
        journeyDate,
        numberOfSeats
    };

    Bus.findOne({
            source: req.body.source,
            destination: req.body.destination
        })
        .then(bus => {
            if (!bus) {
                return res.status(404).json({
                    "message": "Bus not found"
                })
            } else {
                if (numberOfSeats > bus.availableSeats.length) {
                    return res.status(200).json({
                        "message": "Not enough seats"
                    });
                } else {
                    const busId = bus._id;
                    let bookedSeats = bus.availableSeats.slice(0, numberOfSeats);
                    const seatsAvailable = bus.availableSeats.slice(0);
                    bus.availableSeats = seatsAvailable.slice(numberOfSeats);
                    bookedSeats.map(seat => bus.reservedSeats.push(seat));
                    bus.save();
                    const bookingDetails = {
                        ...bookingDetail,
                        user: req.user._id,
                        busId: busId,
                        seatNumbers: bookedSeats
                    }
                    Booking.create(bookingDetails)
                        .then(booking => {
                            booking.save();
                            return res.status(200).json(booking)
                        })
                        .catch(error => {
                            res.status(400).json({
                                "error": "Booking failed"
                            })
                        });
                }
            }
        })
        .catch(error => res.status(400).json({
            "error": "Bus does not exist"
        }));
    }

});
router.get('/old', (req,res) => {
    return
})
module.exports = router;