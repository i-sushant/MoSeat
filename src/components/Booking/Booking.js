import React from 'react';
import classes from './Booking.module.css';
import Navbar from '../UI/Navigation/Navbar/Navbar';
import Footer from '../UI/Navigation/Footer/Footer';
const Booking = (props) => {
    return (
        <div>
            <Navbar />
            <h3 style={{'color':'#530806','textAlign':'center','marginTop':'1.5%'}}>Booking Details</h3>
            <div className={classes.booking_container}>  
                <div className={classes.form_container}>
                    <form onSubmit={props.handleSubmit}>
                        <div className={classes.input_container}>
                            <input placeholder="Main Passesnger" name="name" required value={props.passengerName} className={classes.effect_1} type="text" onChange={props.inputChangeHandler}/>
                            <span className={classes.focus_border} />
                        </div>
                        <div className={classes.selectseat_container}>
                            <span className={classes.seatValue} onClick={props.decreaseSeat}>-</span>
                            <input type="number" onChange={props.inputChangeHandler} required value={props.seatValue} name="totalSeats" placeholder="5"/>
                            <span className={classes.seatValue} onClick={props.increaseSeat}>+</span>
                        </div>
                    </form>
                </div>
                <div className={classes.booking_summary_container}>
                    <div className={classes.header}>
                       <h3>Booking Summary</h3>
                    </div>
                    <h4>Bus number : 15</h4>
                    <h4>Source : Cuttack</h4>
                    <h4>Destination : Barbil</h4>
                    <h4>Passenger name : Sushant Gupta</h4>
                    <h4>Total Seats : 5</h4>
                    <h4>Total Price : 100</h4>
                    <button>BOOK NOW !</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Booking
