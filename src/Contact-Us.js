import React from "react";
import {Link, Redirect} from "react-router-dom";

import "./App.css";

function ContactUS(){
    const isUserLoggedIn= localStorage.getItem("isUserLoggedIn");

    if(isUserLoggedIn){
        return <Redirect to="/user-profile"/>
    }
    
    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/">Home Page</Link></li>
                </ul>
            </nav>
        
            <div className="main-body">
                <header>
                    <h1>You can reach us via any of the underlisted channels;</h1>

                    <p><label>Phone Number: +234 7036288696</label><br></br>
                    <label>Email Address: admin@sendIT.com</label><br></br>
                    <label>Instagram: @sendIT</label></p>
                    
                </header>
            </div>
        </div>
    );
}

export default ContactUS;
