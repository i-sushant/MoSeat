import React, { Component } from 'react'
import ShowBooking from '../../components/Booking/ShowBookings/ShowBookings'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
class ShowBookings extends Component {
    componentDidMount(){
        this.props.fetchBookings();
    }
    render() {
        return (
            <div>
               <ShowBooking fetchedBookings= {this.props.fetchedBookings}/> 
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        fetchedBookings : state.booking.bookings
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchBookings: () => dispatch(actions.fetchBookings())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowBookings)
