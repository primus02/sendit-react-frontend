import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import "./App.css";



function GetAllOrders(props){

    useEffect(()=>{
         getOrders();
    },[]);

    const username = localStorage.getItem("username");
    const url = "https://sendit.herokuapp.com";
    const token = localStorage.getItem("token");

    const [orders, setOrders]= useState([]);

    const getOrders=()=>{

        fetch(`${url}/get-orders/search?username=${username}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=> res.json())
        .then(res=>{
            if(res.message=== "No order found"){
                setOrders([]);
            }
            else{
                let arrangedOrders = res.orders.reverse();
                setOrders(arrangedOrders);
            }
        })
        .catch(err=>{
            console.log("Error", err);   
    });
 }

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
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                </ul>
            </nav>
        
            <div className="main-body">
                <header>
                    <h1> Hello <span className="username">{username}</span>!</h1>
                </header>

                <div className="body">
                    
                        <h3>The following are your orders.</h3>
                    <p>To get more information about a particular order, use the details button.</p>
                    
                    <div className="orders-holder">
                        {orders.map(order=>(
                            <div className="orders" key={order._id}>  
                               <p className="order">Order<button className="details-btn"><Link to={`/order/${order._id}`}>Details</Link></button><button className="status">Status: <span className={order.status==="pending" ? "red" : "status-state"}>{order.status}</span></button><button className="location1">Pres-Location: <span className="present-location">{order.preslocation}</span></button></p> 
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
       
        </div>
    );
}

export default GetAllOrders;
