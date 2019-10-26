import React from 'react'
import classes from './Navbar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
const Navbar = (props) => {
    let bookings = null;
    let logout = null;
    if(props.isAuthenticated){
        bookings=(
            <li>
                <Link to={'/showbookings'} >
                    <strong>My Bookings</strong>
                </Link>
            </li>
        )
        logout = (
            <li>
                <Link to={'/'} onClick={props.logout}>
                    <strong>Logout</strong>
                </Link>
            </li>
        )
    }
    return (
        <div>
            <div className={classes.navbar}>
                <nav>
                    <ul>
                    <div className={classes.logo}>
                        <h3 className={classes.h3}>
                        <FontAwesomeIcon
                        icon={faBus}
                        style={{ "fontSize": "40px" }}
                        />
                        <a href="/">MO<span>Seat</span></a>
                        </h3>
                    </div>
                    <li>
                        <a href="/search">
                        <strong>Search</strong>
                        </a>
                    </li>
                    {bookings}
                    {logout}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
