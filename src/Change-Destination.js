import React, {useState} from "react";
import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";



function ChangeDestination(props){

    const username = localStorage.getItem("username");
    const url = "https://sendit.herokuapp.com";
   const token = localStorage.getItem("token");

    const [destination, setDestination]= useState("");

    const updateDestination=(e)=>{
       setDestination(e.target.value);
    };


    const newDestination=()=>{
        if(destination === ""){
            toast.warning("Kindly provide your preferred new destination for this order");
            return;
        }
        else{
            fetch(`${url}/change-destination/search?username=${username}&id=${props.match.params.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
             Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            destination
        })
    })
    .then(res=> res.json())
    .then(res=>{
        if(res.message=== `Order ${props.match.params.id} updated successfully`){
            
           toast.success("Success, your order's new destination updated");
            
            setTimeout(()=>{ props.history.push("/all-orders");}, 3000);
            
        }
        
    })
    .catch(err=>{
        console.log("Error", err);
    });
        }
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
                    <p>Enter the new destination below</p>
                </header>


                <div className="body">
                    
                    <label>New destination: </label>
                    <input type="text" className="input-dest" placeholder="Destination" value={destination} onChange={updateDestination}/>
                    
                    <p><button onClick={newDestination}>Submit</button></p>
                </div>
            </div>
       
        </div>
    );
}

export default ChangeDestination;