import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import classes from "./Search.module.css";
import './Search.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt,faBus, faClock, faPlus, faMinus, faMapMarker, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
class Search extends Component {
  state={
    searchData:this.props.searchData
  }
  increaseSeats = () => {
    if(this.state.seatValue < 100){
      this.setState({
        seatValue: this.state.seatValue + 1
      })
    }
    console.log(this.state.seatValue);
  }
  reduceSeats = () => {
    if(this.state.seatValue > 0){
      this.setState({
      seatValue : this.state.seatValue - 1
      })
    }
    console.log(this.state.seatValue);
  }
  seatValueChangedHandler = (event) => {
    if(event.target.value > 0 || event.target.value < 100){
      this.setState({
        seatValue: parseInt(event.target.value)
      })
    }
    console.log(this.state.seatValue);
  }
  render(){
    let results = "There are no buses to show";
     if(this.props.searchData){
        results = this.props.searchData.buses.map(bus => {
        return (
              <div className={classes.result_card}>
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
                <div className={classes.seat_selection_container}>
                    <h4>Select number of seats</h4>
                    <span className={classes.plus} onClick={this.increaseSeats}>
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                    <span className={classes.seat_number_input}>
                      <input value={this.state.seatValue} onChange={(event) => this.seatValueChangedHandler(event)} miin="0" max="100" type="number"/>  
                    </span>
                    <span className={classes.minus} onClick={this.reduceSeats}>
                      <FontAwesomeIcon icon={faMinus} />
                    </span>
                </div>
                <div className={classes.select}>
                    <div>
                      <span className={[classes.selectseats, classes.seat_availability].join(' ')}>Available Seats : {bus.availableSeats.length}</span>
                    </div>
                    <div>
                        <a className={[classes.selectseats, classes.modalbtn1].join(' ')} href="/" >SUBMIT</a>
                    </div>
                    
                </div>
            </div>)
    });
  }
    return (
      <div className={classes.main_container}>
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


        <form className={classes.search_container} onSubmit={this.props.submitHandler}>
          < div className = { classes.source_container }>
            <label>From</label>
            <input
              placeholder="Enter source station"
              className={classes.effect_1}
              type="text"
              value={this.props.source}
              onChange= {(event) => this.props.sourceChanged(event)}
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
              value={this.props.destination}
              onChange = {(event) => this.props.destinationChanged(event)}
            />
            <span className={classes.focus_border} />
          </div>
          <div className={classes.journey_date_container}>
            <label>Journey Date</label>
            <input
              placeholder="Enter journey date"
              className={classes.effect_1}
              type="text"
              value={this.props.journeyDate}
              onChange = {(event) => this.props.dateChanged(event)}
            />
            <span className={classes.focus_border}/>
          </div>
          <div className={classes.search_btn}>
            <Link 
              to={'/search?source='+this.props.source+"&destination="+this.props.destination}
              className={classes.searchbutton}
              onClick={this.props.searchHandler}>
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
            {/* <div className={classes.bus1}>
              <p className={classes.destination}>Bhubaneswar To Puri</p>
              <p className={classes.start}>16:30</p>
              <p className={classes.line} />
              <p className={classes.end}>06:45</p>
              <p className={classes.hrs}>2hrs</p>
              <div className={classes.select}>
                <a className={[classes.selectseats ,classes.modalbtn1].join(' ')} href="/" id="modal_btn1" >
                  SELECT SEATS
                </a>
              </div>
            </div>
            <div className={[classes.book,classes.modal1,classes.modalcontent1].join(' ')}  id="modal1">
              <span id="close_btn1" className={classes.closebtn1}>
                <FontAwesomeIcon icon={faTimes} className={classes.cross} />
              </span>
              <div className={classes.numseats}>
                <p>Number Of Seats</p>
                <div className={classes.seats}>
                  <button id="plus">
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <input
                    className={classes.effect_2}
                    value="1"
                    min="50"
                    type="number"
                    id="base_price"
                  />
                  <span className={classes.focus_border} />
                  <button id="minus">
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              </div>
              <div className={classes.availableseats}>
                <p>Available Seats</p>
                <span id="num"> 22</span>
                <div className={classes.submit}>
                  <a
                    className={classes.submitbutton}
                    href="/add-website-here"
                    target="_blank"
                    rel="nofollow noopener"
                  >
                    SUBMIT
                  </a>
                </div>
              </div>
            </div> */}
        </div>
        </div>

        {/* <div className={classes.bus2} id="myDiv1">
          <p className={classes.destination}>Bhubaneswar To Puri</p>
          <p className={classes.start}>16:30</p>
          <p className={classes.line} />
          <p className={classes.end}>06:45</p>
          <p className={classes.hrs}>2hrs</p>
          <div className={classes.select}>
            <a className={[classes.selectseats,classes.modalbtn].join(' ')}  href="/" id="modal_btn">
              SELECT SEATS
            </a>
          </div>
        </div>

        <div className={[classes.book2,classes.modal,classes.modalcontent].join(' ')} id="modal">
          <span id="close_btn" className={classes.closebtn}>
            <FontAwesomeIcon icon={faTimes} />
          </span>

          <div className={classes.numseats}>
            <p>Number Of Seats</p>
            <div className={classes.seats}>
              <button id="plus">
                <FontAwesomeIcon icon={faPlus} />                
              </button>
              <input
                className={classes.effect_2}
                value="1"
                min="50"
                type="number"
                id="base_price"
              />
              <span className={classes.focus_border} />
              <button id="minus">
                <FontAwesomeIcon icon={faMinus} />                 
              </button>
            </div>
          </div>
          <div className={classes.availableseats}>
            <p>Available Seats</p>
            <span id="num"> 22</span>
            <div className={classes.submit}>
              <a
                className={classes.submitbutton}
                href="/add-website-here"
                target="_blank"
                rel="nofollow noopener"
              >
                SUBMIT
              </a>
            </div>
          </div>
        </div>

        <div className={classes.bus3} id="myDiv">
          <p className={classes.destination}>Bhubaneswar To Puri</p>
          <p className={classes.start}>16:30</p>
          <p className={classes.line}/>
          <p className={classes.end}>06:45</p>
          <p className={classes.hrs}> 2hrs</p>
          <div className={classes.select}>
            <a className={[classes.selectseats, classes.modalbtn].join(' ')} href="/" id="modal_btn2">
              SELECT SEATS
            </a>
          </div>
        </div>
        <div className={[classes.book3 ,classes.modal2 ,classes.modalcontent2].join(' ')} id="modal2">
          <span id="close_btn2" className={classes.closebtn2}>
            <FontAwesomeIcon icon={faTimes} className={classes.cross}/>
          </span>
          <div className={classes.numseats}>
            <p>Number Of Seats</p>
            <div className={classes.seats}>
              <button id="plus">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <input
                className={classes.effect_2}
                value="1"
                min="50"
                type="number"
                id="base_price"
              />
              <span className={classes.focus_border} />
              <button id="minus">
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
          <div className={classes.availableseats}>
            <p>Available Seats</p>
            <span id="num"> 22</span>
            <div className={classes.submit}>
              <a
                className={classes.submitbutton}
                href="/add-website-here"
                target="_blank"
                rel="nofollow noopener"
              >
                SUBMIT
              </a>
            </div>
          </div>
        </div> */}

        <footer className={classes.footer_distributed}>
          <div className={classes.footer_left}>
            <h3>
              MO<span>Seat</span>
            </h3>
            <p className={classes.footer_links}>
              <a href="/">Home</a> · <a href="/">Blog</a> · <a href="/">Pricing</a> · 
              <a href="/">About</a> · <a href="/">Faq</a> · <a href="/">Contact</a>
            </p>
            <p className={classes.footer_company_name}>MO Seat &copy; 2019</p>
          </div>

          <div className={classes.footer_center}>
            <div>
              <i>
                <FontAwesomeIcon icon={faMapMarker} />
              </i>
              <p>
                <span>21 Revolution Street</span> Bhubaneswar, India
              </p>
            </div>
            <div>
              <i>
                <FontAwesomeIcon icon={faPhone} />
              </i>
              <p>+1 555 123456</p>
            </div>
            <div>
              <i>
                <FontAwesomeIcon icon={faEnvelope} />
              </i>
              <p>
                <a href="mailto:support@company.com">contact@MOseat.com</a>
              </p>
            </div>
          </div>

          <div className={classes.footer_right}>
            <p className={classes.footer_company_about}>
              <span>About the company</span>
              MO Seat is a blog for web designers, graphic designers, web
              developers &amp; SEO Learner.
            </p>
            <div className={classes.footer_icons}>
              <a href="/">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="/">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="/">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="/">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
export default Search;
