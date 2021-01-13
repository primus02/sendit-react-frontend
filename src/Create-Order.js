import React, {useState} from "react";
import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";




function CreateOrder(props){

    const token = localStorage.getItem("token");
    const url = "https://sendit.herokuapp.com";
    const username = localStorage.getItem("username");

    const [location, setLocation]= useState("");
    const [destination, setDestination]= useState("");
    const [price, setPrice]= useState("");
    const [mobileNumber, setMobileNumber]= useState("");
    const [weight, setWeight]= useState("");

    const updateLocation=(e)=>{
         setLocation(e.target.value);
    };

    const updateDestination=(e)=>{
        setDestination(e.target.value);
   };

const updateMobileNumber=(e)=>{
    setMobileNumber(e.target.value);
};

const updateWeight=(e)=>{
    setWeight(e.target.value);
    setPrice(e.target.value * 10);
};


const createOrder=(e)=>{
    e.preventDefault();
	
    if(location ==="" || destination ==="" || price ==="" || weight ==="" || mobileNumber===""){
		
        toast.warning("Kindly provide all necessary fields");
        return;
    }
   if(mobileNumber.length < 11 || mobileNumber.length >11){
		
		toast.warning("Mobile must be 11 digits");
		return false;
	}
    else{

        fetch(`${url}/create-order`, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                username,
                location,
                destination,
				recmobile: mobileNumber,
                weight,
                price
            })
        })
        .then(res=> res.json())
        .then(res=>{
            if(res.message=== "Order created successfully"){
				
                toast.success("Order created successfully!");
				
				setTimeout(()=>{ props.history.push("/all-orders"); }, 3000);
				
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
                    <li className="profile"><Link to="/user-profile">Profile</Link></li>
                    <li><Link to="/all-orders">Get all orders</Link></li>
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                    <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
                </ul>
            </nav>
        
        
        
            <div className="main-body">
                <header>
                    <h1> Hello <span className="username">{username} </span>!</h1>
                    <p>SendIT courier service is available to meet your delivery needs around the clock.</p>
                </header>


                <div className="body">
                    
                        <h3>Before creating an order, kindly note the following:</h3>
                    
                        <ol>
                            <li> Price is calculated based on the weight of your order. <br></br> It is presently x10 of the weight of your order. </li>
                            <li> Order can no longer be cancelled once the status<br></br> has changed to "Delivered". </li>
                        </ol>
                    
                        <p>Being aware of these, do follow the below designed pattern to create your order.</p>
                            
                        <form onSubmit={createOrder}>

                            <label>Pick-Up Location:</label>
                            <input type="text" className="input-location" placeholder="Location" value={location} onChange={updateLocation}/><br></br>

                            <label>Destination: </label>
                            <input type="text" className="input-dest" placeholder="Destination" value={destination} onChange={updateDestination}/><br></br>
                            
                            <label>Recipient Mobile: </label>
                            <input type="text" className="input-mobile" placeholder="Mobile number" value={mobileNumber} onChange={updateMobileNumber}/><br></br>

                            <label>Weight(Kg):</label>
                            <input type="text" className="input-wt" placeholder="weight in kg" value={weight} onChange={updateWeight}/><br></br>

                            <label>Price(#):</label>
                            <input type="number" className="input-price" placeholder="price" value={price} disabled />

                            <p><button type="submit" className="submit-order">Submit</button></p>
                    
                        </form>
                    
                </div>
            </div>
       
        </div>
    );
}

export default CreateOrder;