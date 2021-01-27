import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
const google = window.google ? window.google : {};


function OrderDetails(props){

    const [newDestination, setNewDestination]= useState("");

    const [newPickLocation, setNewPickLocation]=useState("");

    const [newWeight, setNewWeight]=useState("");

    const [newMobile, setNewMobile]=useState("");

    const [newPrice, setNewPrice]=useState("");

    useEffect(()=>{
        getOrder();

        let  autocomplete = new google.maps.places.Autocomplete(
            (document.getElementsByClassName('new-destination')[0]),
    
            { types: ['geocode']});

        let  autocomplete1 = new google.maps.places.Autocomplete(
            (document.getElementsByClassName('new-picklocation')[0]),
        
            { types: ['geocode']});
    
    
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
    
               completeAddress(autocomplete);
    
        });

        google.maps.event.addListener(autocomplete1, 'place_changed', function() {
    
            completeAddress(autocomplete1);
 
     });
    
        const completeAddress=()=>{
            setNewDestination(document.getElementsByClassName('new-destination')[0].value);
            setNewPickLocation(document.getElementsByClassName("new-picklocation")[0].value);
          }
    });

    const username = localStorage.getItem("username");
    const url = "https://sendit.herokuapp.com";
    const token = localStorage.getItem("token");
    const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");

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

            if(res.message.message ==="jwt expired"){
                localStorage.clear();
                props.history.push("/");
            }

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

    const updatedNewLocation=(e)=>{
        setNewPickLocation(e.target.value);
    };

    const updatedNewWeight=(e)=>{
        setNewWeight(e.target.value);
        setNewPrice(e.target.value * 10);
    };

    const updatedNewMobile=(e)=>{
        setNewMobile(e.target.value);
    };

    const updateNewOrderInfo=(e)=>{
        e.preventDefault();

        const number= /^[0-9]+$/;

        if(!newWeight.match(number)){
            toast.info("Please enter a valid figure in the weight field! (do not include any letter");
            return;
        }

          else{
			
            fetch(`${url}/edit-order/search?username=${username}&id=${props.match.params.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json", 
             Authorization: `Bearer ${token}`
           },
           body: JSON.stringify({
            username,
		    location: newPickLocation,
		    price: newPrice,
		    weight: newWeight,
            destination: newDestination,
		    recmobile: newMobile,
		    date: Date.now()

          })
    })
    .then(res=> res.json())
    .then(res=>{

        if(res.message.message ==="jwt expired"){
            localStorage.clear();
            props.history.push("/");
        }

        if(res.message=== `Order ${props.match.params.id} updated successfully`){
            
           toast.success("Success, your order's new information updated");
            
            setTimeout(()=>{ window.location.reload(); }, 3000);
            
        }
        
    })
    .catch(err=>{
        console.log("Error", err);
    });
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

    if(res.message.message ==="jwt expired"){
        localStorage.clear();
        props.history.push("/");
    }
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

    if(!isUserLoggedIn){
        return <Redirect to="/"/>
    }

    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/user-profile">Home Page</Link></li>
                    <li><Link to="/create-order">Create Order</Link></li>
                    <li><Link to="/all-orders">Get Orders</Link></li>
                    <li className="sign-out" onClick={signOut}>Sign out</li>
                    <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
                </ul>
            </nav>
        
        
        
            <div className="main-body">

                <div className="dest-modal d-none">
                    <p>Kindly provide the new destination for your order below and click on the submit button</p>
                    
                    <form className="dest-form" onSubmit={updateNewOrderInfo}>

                        <input type="text" className="new-picklocation" placeholder="Enter new pick-up location" value={newPickLocation} onChange={updatedNewLocation} required/>

                        <input type="text" className="new-destination" placeholder="Enter new destination" value={newDestination} onChange={updatedDestination}/>
                        
                        <input type="text" className="new-weight" placeholder="Enter the new weight" value={newWeight} onChange={updatedNewWeight} required/>

                        <input type="number" className="new-price" placeholder="new price" value={newPrice} disabled required/>

                        <input type="tel" className="new-mobile" placeholder="Enter new recipient mobile"  pattern="\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$"  value={newMobile} onChange={updatedNewMobile} required/>


                        <p><button>Submit</button></p>
                    </form>
                </div>

                <header>
                    <h1> Hello <span className="username">{username}</span>!</h1>
                </header>


                <div className="body">
                    
                    <h3>Here are the details of your order.</h3>
                            
                        <p className={order.status==="pending" ? "" : "d-none"}> Use the edit button to change the information of your order and <br></br> the cancel button to cancel your order</p>
                    
                        <div className="orders order-details">  
                            <p className="order">Order details;</p>
                            
                            <div className="order-info">

                                <label>Weight(Kg): </label><span className="weight">{order.weight} </span><br></br>

                                <label>Price(#): </label><span className="price">{order.price} </span><br></br>

                                <label>Pick-Up Location: </label><span className="pick-location">{order.location}</span><br></br>

                                <label>Destination: </label><span className="destination">{order.destination}</span><br></br>

                                <label>Recipient Mobile: </label><span className="mobile">{order.recmobile}</span><br></br>

                                <label>Date of creation: </label><span className="date">{order.date}</span>

                                {order.status === "pending" ? <p><button className="edit" onClick={changeDestination}>Edit-Order</button><button className="cancel" onClick={cancelOrder}>Cancel-Order</button></p> 
                                : <p className="delivered">Status: Delivered</p>}
                            </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
