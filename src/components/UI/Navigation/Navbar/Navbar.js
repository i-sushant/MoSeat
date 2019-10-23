import React from 'react'
import classes from './Navbar.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBus } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
const Navbar = (props) => {
    let name = null;
    let logout = null;
    if(props.isAuthenticated){
        name=(
            <li>
                <Link to={'/search'} >
                    <strong>{props.name}</strong>
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
                    {name}
                    {logout}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar
