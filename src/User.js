import React from "react";
import {Link, Redirect} from "react-router-dom";

import "./App.css";


function UserIn(props){
   
    const username = localStorage.getItem("username");
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");

    const signOut=()=>{
        localStorage.clear();
        props.history.push("/");
    };

    if(!isUserLoggedIn){
        return <Redirect to="/"/>
    }

    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li className="profile"><Link to="/user-profile">Home Page</Link></li>
                    <li><Link to="/create-order">Create Order</Link></li>
                    <li><Link to="/all-orders">Get Orders</Link></li>
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                </ul>
            </nav>
        
        
        
            <div className="main-body">
                <header>
                    <h1> Welcome <span className="username">{username}</span>!</h1>
                    <p>SendIT courier service is available to meet your delivery needs around the clock.</p>
                </header>


                <div className="body">
                    
                        <h2>Do you wish to explore our services?</h2>
                            
                        <p>You can start by creating a delivery order using the create order button displayed above.</p>           
                </div>
            </div>
        </div>
    );
}

export default UserIn;
