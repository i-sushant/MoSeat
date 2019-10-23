import React from 'react'
import Navbar from '../../UI/Navigation/Navbar/Navbar';
import Footer from '../../UI/Navigation/Footer/Footer';
import classes from './ShowBookings.module.css'
const ShowBookings = () => {
    return (
        <div>
            <Navbar />
            <div className={classes.body_container}>
                <h3>My Bookings</h3>
                <div className={classes.line_separator}></div>
                <div className={classes.results_container}>
                    <div className={classes.result_card}>

                    </div>
                    <div className={classes.result_card}></div>
                    <div className={classes.result_card}></div>
                    <div className={classes.result_card}></div>
                    <div className={classes.result_card}></div>
                    <div className={classes.result_card}></div>
                    <div className={classes.result_card}></div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ShowBookings
