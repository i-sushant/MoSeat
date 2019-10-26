import React, { Component } from 'react'
import ShowBooking from '../../components/Booking/ShowBookings/ShowBookings'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
class ShowBookings extends Component {
    componentDidMount(){
        setTimeout(() => this.props.fetchBookings(), 1000)
    }
    render() {
        return (
            <div>
               <ShowBooking fetchedBookings= {this.props.fetchedBookings} loading={this.props.loading} fetchError={this.props.fetchError}/> 
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        fetchedBookings : state.booking.bookings,
        loading:state.booking.loading,
        fetchError:state.booking.fetchError
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchBookings: () => dispatch(actions.fetchBookings())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowBookings)
