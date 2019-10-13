import React from "react";
import { Link } from 'react-router-dom';
import classes from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faExchangeAlt,
  faBusinessTime,
  faAddressBook,
  faUsers,
  faMapMarker,
  faPhone,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
  faGithub
} from "@fortawesome/free-brands-svg-icons";

const Home = (props) => {
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
          <form onSubmit={props.searchHandler} className={classes.row}>
              <div className={classes.col_8}>
                <h3>
                  <FontAwesomeIcon
                    icon={faBus}
                    size="lg"
                    style={{ "fontSize": "80px" }}
                  />
                  MO<span>Seat</span>
                </h3>
              </div>
              <div className={classes.col_3}>
                <p>From</p>
                <input
                  className={classes.effect_1}
                  type="text"
                  placeholder="Eg. Pune"
                  value={props.source}
                  onChange={(event) => props.sourceChanged(event)}
                />
                <span className={classes.focus_border} />
              </div>
              <div className={classes.col_6}>
                <h2>
                  <FontAwesomeIcon icon={faExchangeAlt} className={classes.swap} />
                </h2>
              </div>
              <div className={classes.col_4}>
                <p>To</p>
                <input
                  className={classes.effect_1}
                  type="text"
                  placeholder="Eg Mumbai"
                  value={props.destination}
                  onChange={(event) => props.destinationChanged(event)}
                />
                <span className={classes.focus_border} />
              </div>
              <div className={classes.col_5}>
                <p>Date</p>
                <input
                  className={classes.effect_1}
                  type="date"
                  value={props.journeyDate}
                  onChange={(event) => props.dateChanged(event)}
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
          </form>
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
            <h2>Easy Tutorial</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              sunt ad incidunt molestias dolorum! Quod quas aperiam voluptatum
              quisquam nostrum?
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
            <h2>Easy Tutorial</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              sunt ad incidunt molestias dolorum! Quod quas aperiam voluptatum
              quisquam nostrum?
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
            <h2>Easy Tutorial</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veniam
              sunt ad incidunt molestias dolorum! Quod quas aperiam voluptatum
              quisquam nostrum?
            </p>

            <a href="/">Read More</a>
          </div>
        </div>
      </div>

      <footer className={classes.footer_distributed}>
        <div className={classes.footer_left}>
          <h3>
            MO<span>Seat</span>
          </h3>

          <p className={classes.footer_links}>
            <a href="/">Home</a> · <a href="/"> Blog</a> · <a href="/"> Pricing</a> · 
            <a href="/">About</a> · <a href="/"> Faq</a> · <a href="/"> Contact</a>
          </p>

          <p className={classes.footer_company_name}>MO Seat &copy; 2019</p>
        </div>

        <div className={classes.footer_center}>
          <div>
            <i>
              <FontAwesomeIcon icon={faMapMarker} />
            </i>

            <p>
              <span>21 Revolution Street</span> Delhi, India
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
};
export default Home;
