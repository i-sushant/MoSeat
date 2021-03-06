import React from 'react';
import classes from './Booking.module.css';
import Navbar from '../UI/Navigation/Navbar/Navbar';
import Footer from '../UI/Navigation/Footer/Footer';
const Booking = (props) => {
    let btnDisabled = props.passengerName === '' || props.passengerName === null || props.totalSeats <= 0;
    let btnStyle = classes.button;
    if(btnDisabled){
        btnStyle = [classes.button, classes.btnDisable].join(' ');
    }
    let bookingOn = (
        <>
            <h4>Bus number : 15</h4>
            <h4>Journey Date: {props.journeyDate}</h4>
            <h4 style={{'textTransform':'capitalize'}}>Source : {props.source}</h4>
            <h4 style={{'textTransform':'capitalize'}}>Destination : {props.destination}</h4>
            <h4>Passenger name : {props.passengerName}</h4>
            <h4>Total Seats : {props.totalSeats}</h4>
            <h4>Total Price : {props.totalPrice ? props.totalPrice : null}</h4>
            <button className={btnStyle} onClick={props.openModal} disabled={btnDisabled}>BOOK NOW !</button>
        </>
    )
    return (
        <div>
            <Navbar type="Booking"/>
            <h3 style={{'color':'#530806','textAlign':'center','marginTop':'1.5%'}}>Booking Details</h3>
            <div className={classes.booking_container}>  
                <div className={classes.form_container}>
                    <form onSubmit={props.handleSubmit}>
                        <div className={classes.input_container}>
                            <input placeholder="Main Passesnger" name="name" required  className={classes.effect_1} type="text" onChange={props.nameChangeHandler}/>
                            <span className={classes.focus_border} />
                        </div>
                        <div className={classes.selectseat_container}>
                            <span className={classes.seatValue} onClick={props.decreaseSeat}>-</span>
                            <input type="number" onKeyDown={props.seatChangeHandler} required value={props.totalSeats} name="totalSeats" placeholder="5"/>
                            <span className={classes.seatValue} onClick={props.increaseSeat}>+</span>
                        </div>
                    </form>
                </div>
                <div className={classes.booking_summary_container}>
                    <div className={classes.header}>
                        <h3>Booking Summary</h3>
                    </div>
                    {bookingOn}
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Booking
