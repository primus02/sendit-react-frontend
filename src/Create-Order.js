import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
const google= window.google ? window.google : {};


function CreateOrder(props){

    const [location, setLocation]= useState("");
    const [destination, setDestination]= useState("");
    const [price, setPrice]= useState("");
    const [mobileNumber, setMobileNumber]= useState("");
    const [weight, setWeight]= useState("");

    useEffect(()=>{

        let  autocomplete = new google.maps.places.Autocomplete(
            (document.getElementsByClassName('input-location')[0]),
    
            { types: ['geocode']});

        let  autocomplete1 = new google.maps.places.Autocomplete(
                (document.getElementsByClassName('input-dest')[0]),
        
                { types: ['geocode']});
    
    
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
    
               completeAddress(autocomplete);
    
        });

        google.maps.event.addListener(autocomplete1, 'place_changed', function() {
    
            completeAddress(autocomplete1);
 
     });
    
        const completeAddress=()=>{
            setLocation(document.getElementsByClassName('input-location')[0].value);
            setDestination(document.getElementsByClassName('input-dest')[0].value);
          }

    });

    const token = localStorage.getItem("token");
    const url = "https://sendit.herokuapp.com";
    const username = localStorage.getItem("username");
    const isUserLoggedIn= localStorage.getItem("isUserLoggedIn");


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
	
     const number= /^[0-9]+$/;

  if(!weight.match(number)){
      toast.info("Please enter a valid figure in the weight field! (do not include any letter");
      return;
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

            if(res.message.message ==="jwt expired"){
                localStorage.clear();
                props.history.push("/");
            }

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

if(!isUserLoggedIn){
    return <Redirect to="/"/>
}

    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li className="profile"><Link to="/user-profile">Home Page</Link></li>
                    <li><Link to="/all-orders">Get Orders</Link></li>
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
                            <input type="tel" className="input-mobile" placeholder="example: +2349012345678"  pattern="\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$" value={mobileNumber} onChange={updateMobileNumber}/><br></br>

                            <label>Weight(Kg):</label>
                            <input type="text" className="input-wt" placeholder="weight" value={weight} onChange={updateWeight}/><br></br>

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
