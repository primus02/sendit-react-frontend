import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import "./App.css";



function UserProfile(props){
    useEffect(()=>{
        getuserDetails();
    });

const username = localStorage.getItem("username");

const url = "https://sendit.herokuapp.com";

const name = localStorage.getItem("name");

const email = localStorage.getItem("email");

const mobile = localStorage.getItem("mobile");

const address = localStorage.getItem("address");

const token = localStorage.getItem("token");

    const [orders, setOrders]= useState([]);
    const [completedCount, setCompletedCount]=useState(0);
    const [inTransitCount, setInTransitCount]=useState(0);
  

    const signOut=()=>{
        localStorage.clear();
        props.history.push("/");
    };

    const getuserDetails=()=>{

        fetch(`${url}/get-orders/search?username=${username}`, {
    
            method: "GET",
            headers: {
                Authorization: `Authorization ${token}` 
            }
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.message === "No order found"){
            setOrders([]);
            }
            else{
                 setOrders(res.orders);

                 const completeCount = res.orders.filter(order=> order.status==="delivered").length;  
                 setCompletedCount(completeCount) ;  

                 const transitCount = res.orders.filter(order=> order.status==="pending").length;  
                 setInTransitCount(transitCount) ;  
            }
        })
        .catch(err=>{
            console.log("Error", err);
        });
    };

    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/create-order">Create Order</Link></li>
                    <li><Link to="/all-orders">Get all orders</Link></li>
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                </ul>
            </nav>
        
        
        
            <div className="main-body profile-info">
                <header>
                    <h1> Hello <span className="username">{username}</span>!</h1>
                    <div className="details">
                        <h3><label>Username: </label> <span className="username">{username}</span></h3>
                        <h3><label>Name: </label><span className="name">{name}</span></h3>
                        <h3><label>Email: </label> <span className="email">{email}</span></h3>
                        <h3><label>Mobile-No: </label> <span className="mobile">{mobile}</span></h3>
                        <h3><label>Address: </label> <span className="address">{address}</span></h3>
                    </div>
                </header>


                <div className="body">
                
                    <h3>Your order history is as displayed;</h3>
                    <div className="details">  
                        <h3><label>Total number of orders: </label><span className="total-num">{orders.length > 1 ? orders.length : 0} </span></h3>  
                        <h3><label>Total number of completed orders: </label> <span className="total-completed delivered">{completedCount}</span></h3> 
                        <h3><label>Total number of In-transit orders: </label> <span className="total-transit pending">{inTransitCount}</span></h3> 
                    </div>
                
                </div>
            </div>
       
        </div>
    );
}

export default UserProfile;
