import React from 'react'
import Navbar from '../../UI/Navigation/Navbar/Navbar';
import Footer from '../../UI/Navigation/Footer/Footer';
import classes from './ShowBookings.module.css'
import Spinner from '../../UI/Spinner/Spinner'
const ShowBookings = (props) => {
    let bookings ="";
    if(props.loading){
        bookings = <Spinner />
    }
    if(props.fetchedBookings.length >= 1){
        bookings = props.fetchedBookings.reverse().map(booking => {
            return (
                <div className={classes.result_card}>
                        <div>
                            <h4>Journey Date</h4>
                            <h4>{booking.journeyDate.substring(0,15)}</h4>
                        </div>
                        <div>
                            <h4>Source</h4>
                            <h4>{booking.source}</h4>
                        </div>
                        <div>
                            <h4>Destination</h4>
                            <h4>{booking.destination}</h4>
                        </div>
                        <div>
                            <h4>Passenger Name</h4>
                            <h4>{booking.name}</h4>
                        </div>
                        <div>
                            <h4>Seat Numbers</h4>
                            <h4>{booking.seatNumbers.join(', ')}</h4>
                        </div>
                        <div>
                            <h4>Total Fare</h4>
                            <h4>{booking.totalFare}</h4>
                        </div>
                    </div>
            )
        })
    }
    return (
        <div>
            <Navbar />
            <div className={classes.body_container}>
                <h3>Mo<span style={{'color':'#ed3330'}}>Seats</span> </h3>
                <div className={classes.line_separator}></div>
                <div className={classes.results_container}>
                    {bookings}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ShowBookings