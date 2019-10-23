import React, { Component } from 'react'
import BookingTickets from '../../components/Booking/Booking'
class Booking extends Component {
    state= {
        name:'',
        numberOfSeats:0,
        busNumber:'',
        totalPrice:0

    }
    render() {
        return (
            <div>
                <BookingTickets />
            </div>
        )
    }
}
const mapStateTOProps = state => {
    return {
        name:state.booking.name,
        totalPrice:state.booking.totalPrice,
        
    }
}
export default Booking
