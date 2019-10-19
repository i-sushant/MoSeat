import React from 'react'
import classes from './Navbar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {
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
                        MO<span>Seat</span>
                        </h3>
                    </div>
                    <li>
                        <a href="/">
                        <strong>Home</strong>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                        <strong>About</strong>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                        <strong>Services</strong>
                        </a>
                    </li>
                    <li>
                        <a href="/">
                        <strong>Contact</strong>
                        </a>
                    </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
