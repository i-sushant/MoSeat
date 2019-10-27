import React, { Component } from 'react'
import BookingTickets from '../../components/Booking/Booking'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import Modal from '../../components/UI/Modal/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import Auth from '../Auth/Auth';
import Spinner from '../../components/UI/Spinner/Spinner'
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
            closeModal : false
        });
    }
    openModal = () => {
        this.setState({
            closeModal:true
        })
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
        console.log(this.props.journeyDate);
        this.props.bookNow(bookingData);
        
    } 
    bookingForward = () => this.props.history.push('/') ;
    render() {
        if(!this.state.closeModal && (this.props.booked || (this.props.error !== null && this.props.error !== ''))){
            setTimeout(() => this.bookingForward() , 2000);
        }
        const styles = {
            main : {
                'display':'flex',
                'flexDirection':'column',
                'justifyContent':'center',
                'alignItems':'center',
                'minHeight':'15em'
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
            },
            confirm:{
                'display': 'flex',
                'flexDirection': 'row',
                'marginTop':'10%'
            },
            actionBtn1 : {
                'width':'10em',
                'height':'4em',
                'border':'none',
                'outline':'none',
                'color':'white',
                'borderRadius':'4px',
                'backgroundColor':'#ed3330',
                'fontSize':'0.9em',
                'marginRight':'5%'
            },
            actionBtn2: {
                'width': '10em',
                'height': '4em',
                'border': 'none',
                'outline': 'none',
                'backgroundColor': '#4caf50',
                'color': 'white',
                'borderRadius': '4px',
                'fontSize': '0.9em'
            }

        }
        let modalContent = (
            <>
            </>
        );
        if(!this.props.isAuthenticated){
            modalContent = (
                <div>
                    <Auth error={this.props.authError} authStart={this.props.authStart}/>
                </div>
            )
        }
        if (this.props.isAuthenticated) {
            modalContent = (
                <div style={styles.main}>
                    <h3 style={{'fontSize':'25px','color':'#000'}}>Proceed with booking ?</h3>
                    <div style={styles.confirm}>
                        <button style={styles.actionBtn1} onClick={this.closeModal}>Edit Booking</button>
                        <button style={styles.actionBtn2} onClick={this.submitHandler}>Confirm booking</button>
                    </div>
                </div>
            )
        }
        if(this.props.loading) {
            modalContent = < Spinner />
        }
        if(this.props.isAuthenticated && (this.props.booked || (this.props.error !== null && this.props.error !== ""))){
            modalContent = (
                <div style={styles.main}>
                    {this.props.booked ? <FontAwesomeIcon icon={faCheckCircle} style={styles.icon}/> : <FontAwesomeIcon icon={faTimesCircle} style={styles.icon}/> }
                    <h2 style={{'fontSize':'25px','color':'#000'}}>{this.props.booked ? 'Booking Successful' : this.props.error ? this.props.error : 'Booking Failed'}</h2>
                    <button style={styles.goBack} onClick={this.bookingForward}>Go to Homepage</button>
                </div>
            ); 
        }
        //console.log("First check " + (!this.props.isAuthenticated && !this.state.closeModal));
       // console.log("Second check " + (!this.state.closeModal && (this.props.booked || (this.props.error !== null && this.props.error !== ''))))
        let show = this.state.closeModal 
        // show = {
        //     !this.props.isAuthenticated || (!this.state.closeModal && (this.props.booked || (this.props.error !== null && this.props.error !== '')))
        // }
        //let show = !this.props.isAuthenticated || ( !this.state.closeModal && (this.props.booked || (this.props.error !== null && this.props.error !== '')))
        return (
            <div>
                <Modal show = {show}  modalClosed={this.closeModal}>
                    {modalContent}
                </Modal>
                <BookingTickets decreaseSeat={this.decreaseSeat}
                                increaseSeat={this.increaseSeat}
                                seatValue={this.state.seatValue}
                                seatChangeHandler={this.seatChangeHandler}
                                nameChangeHandler= {this.nameChangeHandler}
                                totalSeats={this.props.totalSeats === 0 ? '' : this.props.totalSeats}
                                passengerName = {this.state.name} 
                                openModal={this.openModal}
                                source={this.props.source}
                                destination={this.props.destination}
                                totalPrice={this.props.totalPrice}
                                journeyDate={this.props.journeyDate}
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
        error:state.booking.bookError,
        authError:state.auth.error,
        isAuthenticated: state.auth.token != null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        bookNow: (bookingData) => dispatch(actions.bookNow(bookingData)),
        addSeat: () => dispatch(actions.addSeat()),
        removeSeat : () => dispatch(actions.removeSeat()),
        changeTotalSeats: (totalSeats) => dispatch(actions.changeTotalSeats(totalSeats)),
        updateTotalPrice: () => dispatch(actions.updateTotalPrice()),
        authStart: () => dispatch(actions.authStart())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Booking);
