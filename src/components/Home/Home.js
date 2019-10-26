import React from "react";
import { Link } from 'react-router-dom';
import classes from "./Home.module.css";
import Footer from '../UI/Navigation/Footer/Footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faExchangeAlt,
  faBusinessTime,
  faAddressBook,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from '../UI/SearchBar/SearchBar'

const Home = (props) => {
  const callForAuth = () => {
    props.handleAuthClicked();
    props.logout();
  }
  let authentication = (
    <li>
      <Link to={'/'} onClick={props.handleAuthClicked}>
        <strong>Sign in/Sign up</strong>
      </Link>
    </li>
  );
  let name = null;
  if(props.isAuthenticated){
    name = (
      <li>
          <Link to={'/showbookings'}>
            <strong>My Bookings</strong>
          </Link>
        </li>
  )
    authentication = (     
        <li>
          <Link to={'/'} onClick={callForAuth}>
            <strong>Logout</strong>
          </Link>
        </li>
    )
  }
  // console.log(props.loginDetails.name);
  // if(props.isAuthenticated){
  //   name = "Welcome " + props.loginDetails.name
  // }
  return (
    <div className={classes.home}>
      <header>
        <div className={classes.pic}>
          <nav>
            <ul>
              <li>
                <a href="/">
                  <strong>Home</strong>
                </a>
              </li>
              <li>
                <a href="/search">
                  <strong>Search</strong>
                </a>
              </li>
              {name}
              {authentication}
            </ul>
          </nav>
          <div className={classes.companylogo}>
            <h3>
              <FontAwesomeIcon
                icon={faBus}
                size="lg"
                style={{ "fontSize": "80px" }}
              />
              MO<span>Seat</span>
            </h3>
          </div>
          <SearchBar />
          {/* <form onSubmit={props.searchHandler} className={classes.row}>
              <div className={classes.col_3}>
                <p>From</p>
                <input
                  className={classes.effect_1}
                  type="text"
                  name="source"
                  placeholder="Eg. Pune"
                  value={props.source}
                  onChange={(event) => props.fieldChanged(event)}
                />
                <span className={classes.focus_border} />
              </div>
              <div className={classes.col_6}>
                <h2>
                  <FontAwesomeIcon icon={faExchangeAlt} className={classes.swap} onClick={props.switchRoute}/>
                </h2>
              </div>
              <div className={classes.col_4}>
                <p>To</p>
                <input
                  className={classes.effect_1}
                  type="text"
                  name="destination"
                  placeholder="Eg Mumbai"
                  value={props.destination}
                  onChange={(event) => props.fieldChanged(event)}
                />
                <span className={classes.focus_border} />
              </div>
              <div className={classes.col_5}>
                <p>Date</p>
                <input
                  className={classes.effect_1}
                  type="date"
                  name="journeyDate"
                  value={props.journeyDate}
                  onChange={(event) => props.fieldChanged(event)}
                />
                <span className={classes.focus_border} />
              </div>
              <div className={classes.col_7}>
                <Link
                  className={classes.example_a}
                  to={'/search?source='+props.source+"&destination="+props.destination}
                  target="_blank"
                  rel="nofollow noopener"
                  onClick={props.searchHandler}
                >
                  SEARCH
                </Link>
              </div>
          </form> */}
        </div>
      </header>
      <div className={classes.flex_container}>
          <div className={classes.card}>
              <span>
                <h2 className={classes.he}>SERVICES</h2>{" "}
                <h2>
                  <FontAwesomeIcon
                    icon={faBusinessTime}
                    style={{ "fontSize": "50px" }}
                    className={classes.lap}
                  />
                </h2>
              </span>{" "}
              <span/>
              <span/>
              <span/>
              <div className={classes.content}>
                <h2>Easy Bookings</h2>
                <p>
                  Hassle free bookings for your journey. We care for your convenience
                </p>
                <a href="/">Read More</a>
              </div>
          </div>

          <div className={classes.card2}>
            <span >
              <h2 className={classes.hr}>REVIEWS</h2>{" "}
              <h2>
                <FontAwesomeIcon
                  icon={faAddressBook}
                  style={{ "fontSize": "50px" }}
                  className={classes.lap}
                />
              </h2>
            </span>{" "}
            <span />
            <span />
            <span />
            <div className={classes.content}>
              <h2>Top Reviews</h2>
              <p>
                We are rated as the best in the industry for ticket bookings.
              </p>

              <a href="/">Read More</a>
            </div>
          </div>

          <div className={classes.card3}>
            <span >
              <h2 className={classes.ht}>TEAM</h2>{" "}
              <h2>
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{ "fontSize": "50px" }}
                  className={classes.lap}
                />
              </h2>
            </span>{" "}
            <span />
            <span />
            <span />
            <div className={classes.content}>
              <h2>Best in class experts</h2>
              <p>
                We are a team of enthusiasts always trying to improve our application and providing new features for consumers like you.
              </p>
              <a href="/">Read More</a>
            </div>
          </div>
      </div>
      <Footer />
    </div>
  );
};
export default Home;
