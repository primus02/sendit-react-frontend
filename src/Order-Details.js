import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import "./App.css";



function OrderDetails(props){

    useEffect(()=>{
        getOrder();
    });

    const username = localStorage.getItem("username");
    const url = "https://sendit.herokuapp.com";
    const token = localStorage.getItem("token");

    const [order, setOrder]= useState({});

    const getOrder=()=>{

        fetch(`${url}/get-order/search?username=${username}&id=${props.match.params.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=> res.json())
        .then(res=>{
            if(res.message=== "Order found successfully"){
                setOrder(res.order[0]);
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
                    <li><Link to="/user-profile">Profile</Link></li>
                    <li><Link to="/create-order">Create Order</Link></li>
                    <li><Link to="/all-orders">Get all orders</Link></li>
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                </ul>
            </nav>
        
        
        
            <div className="main-body">
                <header>
                    <h1> Hello <span className="username">{username}</span>!</h1>
                </header>


                <div className="body">
                    
                    <h3>Here are the details of your order.</h3>
                            
                        <p> Use the edit button to change the destination of your order and <br></br> the cancel button to cancel your order</p>
                    
                        <div className="orders order-details">  
                            <p className="order">Order details;</p>
                            
                            <div className="order-info">
                                <label>Price(#): <span className="price">{order.price} </span></label><br></br>

                                <label>Pick-Up Location: <span className="location">{order.location}</span></label><br></br>

                                <label>Destination: <span className="destination">{order.destination}</span></label><br></br>

                                <label>Recipient Mobile: <span className="mobile">{order.recmobile}</span></label><br></br>

                                <label>Date of creation: <span className="date">{order.date}</span></label>

                                {order.status === "pending" ? <p><button className="edit"><Link to={`/change-destination/${order._id}`}>Edit-Destination</Link></button><button className="cancel"><Link to={`/cancel-order/${order._id}`}>Cancel-Order</Link></button></p> 
                                : <p>Status: Delivered</p>}
                            </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;