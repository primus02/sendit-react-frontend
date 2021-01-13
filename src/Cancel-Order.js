import React from "react";
import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";



function CancelOrder(props){

    const username = localStorage.getItem("username");
    const url = "https://sendit.herokuapp.com";
    const token = localStorage.getItem("token");

  const cancelOrder=()=>{

    fetch(`${url}/cancel-order/search?username=${username}&id=${props.match.params.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`
        }
    })
    .then(res=> res.json())
    .then(res=> {
        if(res.success){
            
           toast.success("Success, your order has been cancelled");
            
            setTimeout(()=>{ props.history.push("/all-orders");}, 3000);
            
        }
    })
    .catch(err=> {
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
                    <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
                </ul>
            </nav>
        
            <div className="main-body">
                <header>
                    <h1> Hello <span className="username">{username}</span>!</h1>
                </header>


                <div className="body">
                    <p>You are about cancelling your order. Click the button below to cofirm your action</p>
                    
                    <p><button className="confirm" onClick={cancelOrder}>Confirm</button></p>
                    
                </div>
            </div>
       
        </div>
    );
}

export default CancelOrder;