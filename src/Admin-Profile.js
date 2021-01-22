import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import "./App.css";


function AdminProfile(props){

    useEffect(()=>{
         getAllAppOrders();
    });

    const username = localStorage.getItem("username");
    const url = "https://sendit.herokuapp.com";
    const token = localStorage.getItem("token");

     const [ordersCount, setOrdersCount]= useState(0);
     const [completedCount, setCompletedCount]= useState(0);
     const [intransitCount, setIntransitCount]= useState(0);

     const getAllAppOrders=()=>{
        fetch(`${url}/get-all-orders`, {
    
            method: "GET",
            headers: {
                Authorization: `Authorization ${token}` 
            }
        })
        .then(res=>res.json())
        .then(res=>{
            if(res.message === "No order found"){
               setOrdersCount(0);
            }
            else{
                 setOrdersCount(res.OrdersCount);
                
                let completedCount = res.orders.filter(order => order.status === "delivered").length;
                
                 setCompletedCount(completedCount);
                
                  let inTransitCount = res.orders.filter(order=> order.status === "pending").length;
                
                 setIntransitCount(inTransitCount);
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
                    <li><Link to="/all-app-orders">Get all orders</Link></li>
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                </ul>
            </nav>
        
            <div className="main-body">
                <header>
                    <h1> Hello Admin <span className="username">{username}</span>!</h1>
                    <p>SendIT courier service works around the clock.</p>
                </header>
                
                
                <div className="body admin-profile">
                    
                        <h3> Orders history is as displayed;</h3>
                    
                        <div className="details">  
                            <h3><label>Total number of orders: </label><span className="total-num">{ordersCount} </span></h3>  
                            <h3><label>Total number of completed orders: </label> <span className="total-completed delivered">{completedCount}</span></h3> 
                            <h3><label>Total number of In-transit orders: </label> <span className="total-transit pending">{intransitCount}</span></h3> 
                        </div>
                    
                </div>

            </div>
       
        </div>
    );
}

export default AdminProfile;
