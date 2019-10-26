import React, { Component } from 'react'
import BookingTickets from '../../components/Booking/Booking'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Modal from '../../components/UI/Modal/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
class Booking extends Component {
    state= {
        name:'',
        source:'',
        destination:'',
        totalSeats:'',
        busNumber:'',
        totalPrice:0,
        seatValue:0,
        closeModal:false 
    }
    closeModal = () => {
        this.setState({
            closeModal : !this.state.closeModal
        });
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
        
    } 
    bookingForward = () => this.props.history.push('/') ;
    render() {
        if(this.state.closeModal){
            this.props.history.push('/');
        }
        const styles = {
            main : {
                'display':'flex',
                'flexDirection':'column',
                'color':'black',
                'justifyContent':'center',
                'alignItems':'center'
            },
            goBack : {
                'width':'10em',
                'height':'4em',
                'border':'none',
                'outline':'none',
                'backgroundColor': this.props.booked ? '#4caf50' : '#ed3330',
                'color':'white',
                'borderRadius':'4px',
                'fontSize':'0.9em'
            },
            icon:{
               'fontSize': '6em', 
               'color': this.props.booked ? '#4caf50' : '#ed3330', 
               'backgroundColor': 'white'
            }
        }
        return (
            <div>
                <Modal show={!this.state.closeModal && (this.props.booked || this.props.error !== '')} modalClosed={this.closeModal}>
                    <div style={styles.main}>
        {this.props.booked ? <FontAwesomeIcon icon={faCheckCircle} style={styles.icon}/> : <FontAwesomeIcon icon={faTimesCircle} style={styles.icon}/> }
                        <h2 style={{'fontSize':'25px','color':'#000'}}>{this.props.booked ? 'Booking Successful' : this.props.error ? this.props.error : 'Booking Failed'}</h2>
                        <button style={styles.goBack} onClick={this.bookingForward}>Go to Homepage</button>
                    </div>
                </Modal>
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
