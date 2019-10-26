import React, { Component } from 'react'
import BookingTickets from '../../components/Booking/Booking'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'

class Booking extends Component {
    state= {
        name:'',
        source:'',
        destination:'',
        totalSeats:'',
        busNumber:'',
        totalPrice:0,
        seatValue:0    
    }

    decreaseSeat = () => {
        console.log("Decrease Seat")
        this.props.removeSeat()
        this.setState({
            totalSeats :this.props.totalSeats
        }, () => this.props.updateTotalPrice()) 
    }
    increaseSeat = () => {
        console.log("Increase Seat")
        this.props.addSeat()
        this.setState({
            totalSeats: this.props.totalSeats
        }, () => this.props.updateTotalPrice())  
    }
    seatChangeHandler = event => {
        this.setState({
            totalSeats: event.target.value
        }, () => {
            this.props.changeTotalSeats(this.state.totalSeats);
            this.props.updateTotalPrice();
        })
    }
    nameChangeHandler = event => {
        this.setState({
            name:event.target.value
        })
    }
    submitHandler = event => {
        event.preventDefault();
        const bookingData = {
            source:this.props.source,
            destination:this.props.destination,
            journeyDate:this.props.journeyDate,
            totalSeats:this.props.totalSeats,
            totalPrice:this.props.totalPrice,
            name:this.state.name,
            busId:this.props.busId
        }
        this.props.bookNow(bookingData);
        setTimeout(() => this.props.booked ? this.props.history.push('/') : null, 2000);
    } 
    render() {
        
        return (
            <div>
                <BookingTickets decreaseSeat={this.decreaseSeat}
                                increaseSeat={this.increaseSeat}
                                seatValue={this.state.seatValue}
                                seatChangeHandler={this.seatChangeHandler}
                                nameChangeHandler= {this.nameChangeHandler}
                                totalSeats={this.props.totalSeats === 0 ? '' : this.props.totalSeats}
                                passengerName = {this.state.name} 
                                submitHandler={this.submitHandler}
                                source={this.props.source}
                                destination={this.props.destination}
                                totalPrice={this.props.totalPrice}
                                journeyDate={this.props.journeyDate}
                                loading={this.props.loading}
                                error={this.props.error}
                                booked={this.props.booked}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        source:state.booking.source,
        destination:state.booking.destination,
        journeyDate:state.booking.journeyDate,
        basePrice: state.booking.basePrice,
        busId:state.booking.busId,
        name:state.booking.name,
        totalSeats:state.booking.totalSeats,
        totalPrice:state.booking.totalPrice,
        booked:state.booking.booked,
        loading:state.booking.loading,
        error:state.booking.bookError
    }
}
const mapDispatchToProps = dispatch => {
    return {
        bookNow: (bookingData) => dispatch(actions.bookNow(bookingData)),
        addSeat: () => dispatch(actions.addSeat()),
        removeSeat : () => dispatch(actions.removeSeat()),
        changeTotalSeats: (totalSeats) => dispatch(actions.changeTotalSeats(totalSeats)),
        updateTotalPrice: () => dispatch(actions.updateTotalPrice())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Booking);
