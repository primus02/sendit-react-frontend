import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
const google = window.google ? window.google : {};


function OrderDetails(props){

    const [newDestination, setNewDestination]= useState("");

    useEffect(()=>{
        getOrder();

        let  autocomplete = new google.maps.places.Autocomplete(
            (document.getElementsByClassName('new-destination')[0]),
    
            { types: ['geocode']});
    
    
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
    
               completeAddress(autocomplete);
    
        });
    
        const completeAddress=()=>{
            setNewDestination(document.getElementsByClassName('new-destination')[0].value);
          }
    }, []);

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

    const changeDestination=()=>{
        document.querySelector(".dest-modal").classList.remove("d-none");
		
		document.querySelector(".edit").setAttribute("disabled", "");
	    document.querySelector(".cancel").setAttribute("disabled", "");
		
    };

    const updatedDestination=(e)=>{
        setNewDestination(e.target.value);
    };

    const updateNewDestination=()=>{
         
        if(newDestination !==""){
			
            fetch(`${url}/change-destination/search?username=${username}&id=${props.match.params.id}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json", 
             Authorization: `Bearer ${token}`
           },
           body: JSON.stringify({
            destination: newDestination
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
            else{
                window.location.reload();
            }

    };

    const cancelOrder=()=>{
        const decision= prompt("Are you sure you want to cancel this order? Confirm this by typing any word in the space below and click OK!");
		if(decision){
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
		}
		else{
			return;
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

                <div className="dest-modal d-none">
                    <p>Kindly provide the new destination for your order below and click on the submit button</p>
                    
                    <input type="text" className="new-destination" placeholder="Enter new destination" value={newDestination} onChange={updatedDestination}/>
                    
                    <p><button onClick={updateNewDestination}>Submit</button></p>
                </div>

                <header>
                    <h1> Hello <span className="username">{username}</span>!</h1>
                </header>


                <div className="body">
                    
                    <h3>Here are the details of your order.</h3>
                            
                        <p> Use the edit button to change the destination of your order and <br></br> the cancel button to cancel your order</p>
                    
                        <div className="orders order-details">  
                            <p className="order">Order details;</p>
                            
                            <div className="order-info">
                                <label>Price(#): </label><span className="price">{order.price} </span><br></br>

                                <label>Pick-Up Location: </label><span className="pick-location">{order.location}</span><br></br>

                                <label>Destination: </label><span className="destination">{order.destination}</span><br></br>

                                <label>Recipient Mobile: </label><span className="mobile">{order.recmobile}</span><br></br>

                                <label>Date of creation: </label><span className="date">{order.date}</span>

                                {order.status === "pending" ? <p><button className="edit" onClick={changeDestination}>Edit-Destination</button><button className="cancel" onClick={cancelOrder}>Cancel-Order</button></p> 
                                : <p className="delivered">Status: Delivered</p>}
                            </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
