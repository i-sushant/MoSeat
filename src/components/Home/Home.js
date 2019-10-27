import React from "react";
import { Link } from 'react-router-dom';
import classes from "./Home.module.css";
import Footer from '../UI/Navigation/Footer/Footer'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faBusinessTime,
  faAddressBook,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import SearchBar from '../UI/SearchBar/SearchBar'

const Home = (props) => {
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
          <Link to={'/'} onClick={props.authLogout}>
            <strong>Logout</strong>
          </Link>
        </li>
    )
  }
  return (
    <div className={classes.home}>
      <header>
        <div className={classes.pic}>
          <nav>
            <ul>
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
          <SearchBar {...props}/>
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
