import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import "./App.css";


function AppOrderDetails(props){
   useEffect(()=>{
      getorderDetails();
   });

   const username = localStorage.getItem("username");

  const token = localStorage.getItem("token");
  const url = "https://sendit.herokuapp.com";
   const [order, setOrder]= useState({});

   const getorderDetails=()=>{
    fetch(`${url}/get-an-order/${props.match.params.id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(res=> res.json())
    .then(res=>{
        if(res.message=== "Order found successfully"){
            setOrder(res.order);
        }
        
    })
    .catch(err=>{
        console.log("Error", err);
    });
   };

   const signOut=()=>{
       localStorage.clear();
       props.history.push("/");
   };

    return(
       <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/admin-profile">Profile</Link></li>
                    <li><Link to="#">Create Order</Link></li>
                    <li><Link to="/all-app-orders">Get all orders</Link></li>
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                </ul>
            </nav>
            
            <div className="main-body">
                <header>
                    <h1> Hello <span className="username">{username}</span>!</h1>
                </header>


                <div className="body">
                    
                    <h3>Here are the details of the order.</h3>
                    
                        <div className="orders order-details">  
                            <p className="order">Order details;</p>
                            
                            <div className="order-info">
                                <label>Price(#): <span className="price">{order.price} </span></label><br></br>

                                <label>Pick-Up Location: <span className="location">{order.location}</span></label><br></br>

                                <label>Destination: <span className="destination">{order.destination}</span></label><br></br>

                                <label>Recipient Mobile: <span className="mobile">{order.recmobile}</span></label><br></br>

                                <label>Date of creation: <span className="date">{order.date}</span></label>
                            </div>
                            
                    </div>

                    
                </div>
            </div>
       
       </div>
    );
}

export default AppOrderDetails;