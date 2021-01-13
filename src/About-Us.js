import React from "react";
import {Link} from "react-router-dom";

import "./App.css";

function AboutUs(){
    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/">Home Page</Link></li>
                </ul>
            </nav>
        
            <div className="main-body">
                <header>
                    <p>SendIT is a courier service that helps users deliver parcels to different destinations.<br></br> SendIT provides quotes based on weight categories and offer services all over the country.<br></br>You can contact us via any of the channels listed in our contact us page.</p>
                </header>


                <div className="body">
                    <img src="/static/parcel.jpg" alt="parcel"/>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;