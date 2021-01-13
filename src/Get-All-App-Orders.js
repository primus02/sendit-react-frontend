import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

import "./App.css";



function GetAllAppOrders(props){

    useEffect(()=>{
       getAllAppOrders();
    }, []);

    const username = localStorage.getItem("username");
    const url = "https://sendit.herokuapp.com";
   const token = localStorage.getItem("token"); 

    const [orders, setOrders]= useState([]);
    const [userName, setUsername]=useState("");

    const getAllAppOrders=()=>{
        fetch(`${url}/get-all-orders`, {
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
    };

    const signOut=()=>{
        localStorage.clear();
        props.history.push("/");
    };
 

    const filterOrders=(e)=>{
        setUsername(e.target.value); 
          orders.map(order=>{
              let orderUsername = order.username;
              
              if(orderUsername.includes(userName)){
                 return order.price = true;
              }
              else{
                 return order.price = false;
              }
          });
    };

    return(
       <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/admin-profile">Profile</Link></li>
                    <li><Link to="#">Create Order</Link></li>
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                </ul>
            </nav>
            
            <div className="main-body">
                <header>
                    <h1> Hello Admin <span className="username">{username}</span>!</h1>
                </header>


                <div className="body">
                    
                        <h3>The following are all the company's orders presently.</h3>
                    
                        <p> Use the status button to change the status of an order and <br></br> the present location button to change the present location of an order.</p>
                    
                    <div className="search-by-user">
                        <label>Search By Username: </label>
                        <input type="text" className="search" value={userName} onChange={filterOrders}/>
                    </div>
                    
                    <div className="orders-holder">
                        {orders.length<1 ? " " : orders.map(order=>(
                            order.price ? 
                            <div className="orders" key={order._id}>  
                            <p className="order"><span className="order-username">{order.username}</span><button className="details-btn"><Link to={`/app-order/${order._id}`}>Details</Link></button><button className="status"><Link to={`/order-status/${order._id}`}>Status: <span className={order.status==="pending" ? "red" : "status-state"} >{order.status}</span></Link></button><button className="location"><Link to={`/order-location/${order._id}`}>Pres-Location: <span className="present-location" >{order.preslocation}</span></Link></button></p> 
                         </div> : ""
                        )) }
                        
                    </div>
                    
                </div>
            </div>
        
        </div>
    );
}

export default GetAllAppOrders;
