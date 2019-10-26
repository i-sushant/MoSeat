import React from 'react'
import classes from './SearchBar.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faExchangeAlt} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
const SearchBar = (props) => {
    return (
        <div>
            <form className={classes.search_container} onSubmit={props.submitHandler}>
                <div className = { classes.source_container }>
                    <label>From</label>
                    <input
                    placeholder="Pune"
                    className={classes.effect_1}
                    type="text"
                    name="source"
                    value={props.source}
                    onChange= {(event) => props.fieldChanged(event)}
                    />
                    <span className={classes.focus_border} />
                </div>
                <div className={classes.exchange_icon}>
                    <FontAwesomeIcon icon={faExchangeAlt} style={{'color':'grey','fontSize':'1.5em'}} className={classes.icon_exchange} onClick={props.switchRoute}/>
                </div>
                <div className={classes.destination_container}>
                    <label>To</label>
                    <input
                    placeholder="Mumbai"
                    className={classes.effect_1}
                    type="text"
                    name='destination'
                    value={props.destination}
                    onChange = {(event) => props.fieldChanged(event)}
                    />
                    <span className={classes.focus_border} />
                </div>
                <div className={classes.journey_date_container}>
                    <label>Journey Date</label>
                    <input
                    placeholder="Enter journey date"
                    className={classes.effect_1}
                    type="date"
                    name='journeyDate'
                    value={props.journeyDate}
                    onChange = {(event) => props.fieldChanged(event)}
                    />
                    <span className={classes.focus_border}/>
                </div>
                <div className={classes.search_btn}>
                    <Link 
                    to={'/search?source='+props.source+"&destination="+props.destination}
                    className={classes.searchbutton}
                    onClick={props.searchHandler}>
                    Search
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
