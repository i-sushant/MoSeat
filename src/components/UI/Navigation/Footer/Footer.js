import React from 'react'
import classes from './Footer.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
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
const Footer = () => {
    return (
        <div>
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
    )
}

export default Footer
