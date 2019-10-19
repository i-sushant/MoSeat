import React, {Component} from "react";
import {Link} from 'react-router-dom';
import classes from "./Search.module.css";
import './Search.module.css'
import Navbar from '../../components/UI/Navigation/Navbar/Navbar'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt, faClock } from "@fortawesome/free-solid-svg-icons";
import Footer from '../UI/Navigation/Footer/Footer';
const Search = (props) =>  {
    let results = "There are no buses to show";
     if (props.searchData) {
        results = props.searchData.map((bus, index) => {
        return (
              <div className={classes.result_card} key={index}>
                <div className={classes.inner_flex}>
                    <h3 style={{'fontFamily':'sans-serif','textTransform':'capitalize'}}>{bus.source} to {bus.destination}</h3>
                    <div className={classes.journey_time}>
                      <div>
                        <span style={{'fontSize':'27px'}}>{bus.departureTime}</span>
                      </div>
                      <div className={classes.line}></div>
                      <div>
                        <span style={{'fontSize':'27px'}}>{bus.arrivalTime}</span>
                      </div>
                    </div>
                </div>
                <div className={classes.select}>
                    <div>
                      <span className={[classes.selectseats, classes.seat_availability].join(' ')}>Available Seats : {bus.availableSeats.length}</span>
                    </div>
                    <div>
                        <Link className={[classes.selectseats, classes.modalbtn1].join(' ')} to={'/bookticket/'+bus._id} >SUBMIT</Link>
                    </div>
                    
                </div>
            </div>)
    });
  }
    return (
      <div className={classes.main_container}>
        <Navbar />
        <form className={classes.search_container} onSubmit={props.submitHandler}>
          < div className = { classes.source_container }>
            <label>From</label>
            <input
              placeholder="Enter source station"
              className={classes.effect_1}
              type="text"
              name="source"
              value={props.source}
              onChange= {(event) => props.fieldChanged(event)}
            />
            <span className={classes.focus_border} />
          </div>
          <div className={classes.exchange_icon}>
            <FontAwesomeIcon icon={faExchangeAlt} style={{'color':'#ffffff','fontSize':'25px'}}/>
          </div>
          <div className={classes.destination_container}>
            <label>To</label>
            <input
              placeholder="Enter destination station"
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
              type="text"
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


        <div className={classes.up}>
          <div className={classes.in}/>
        </div>
        <div className={classes.timings}>
          <span className={classes.time}>
            Timings <FontAwesomeIcon icon={faClock} />
          </span>
          <div className={classes.buttons}>
            <button className={[classes.button ,classes.button1].join(' ')}>5AM TO 12PM</button>
            <button className={[classes.button ,classes.button2].join(' ')}>12PM TO 5PM</button>
            <button className={[classes.button ,classes.button3].join(' ')}>5PM TO 10PM</button>
            <button className={[classes.button ,classes.button5].join(' ')}>10PM TO 5AM</button>
          </div>
        </div>

        <div className={classes.results_container}>
          <div className={classes.results_flex}>
            {results} 
          </div>
        </div>

        <Footer />
      </div>
    );
  }
export default Search;
