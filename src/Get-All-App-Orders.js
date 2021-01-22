import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";
const google = window.google ? window.google : {};


function GetAllAppOrders(props){

   const [newLocation, setNewLocation]=useState("");

    useEffect(()=>{
       getAllAppOrders();

       let  autocomplete = new google.maps.places.Autocomplete(
        (document.getElementsByClassName('new-location')[0]),

        { types: ['geocode']});


    google.maps.event.addListener(autocomplete, 'place_changed', function() {

           completeAddress(autocomplete);

    });

    const completeAddress=()=>{
        setNewLocation(document.getElementsByClassName('new-location')[0].value);
      }

    });

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

    const changeStatus=(orderId)=>{
        const newStatus = prompt("Kindly enter the new status of this order");
			
			if(newStatus){
            
			 fetch(`${url}/change-status/${orderId}`, {
              method: "PATCH",
              headers: {
               "Content-Type": "application/json", 
               Authorization: `Bearer ${token}`
              },
             body: JSON.stringify({
              status: newStatus.toLowerCase()
             })
           })
           .then(res=> res.json())
           .then(res=>{
             if(res.message=== `Order ${orderId} updated successfully`){
		
             toast.success("Success, order's new status updated!");
        
		     setTimeout(()=>{ window.location.reload();}, 3000);
        
           }
    
           })
           .catch(err=>{
            console.log("Error", err);
         });
	    }
         else{
		 return;
	    } 
    };

    const changeLocation=(orderId)=>{
        document.querySelector(".location-modal").classList.remove("d-none");
        localStorage.setItem("id", orderId);
        document.querySelectorAll(".orders-holder button").forEach((button)=>{
            button.setAttribute("disabled", "");
        });

        document.querySelectorAll(".orders-holder span").forEach((span)=>{
            span.setAttribute("disabled", "");
        });

        document.querySelector(".orders-holder").classList.add("d-none");

         };

    const updatedLocation=(e)=>{
          setNewLocation(e.target.value);
    };

    const updateNewLocation=()=>{

        if(newLocation !==""){
            const orderId = localStorage.getItem("id");

            document.querySelector(".location-modal").classList.add("d-none");
            
            fetch(`${url}/change-location/${orderId}`, {
              method: "PATCH",
              headers: {
               "Content-Type": "application/json", 
               Authorization: `Bearer ${token}`
              },
              body: JSON.stringify({
                preslocation: newLocation
              })
            })
            .then(res=> res.json())
            .then(res=>{
               if(res.message=== `Order ${orderId} updated successfully`){
               toast.success("Success, order's present location updated!");
      
                setTimeout(()=>{ window.location.reload();}, 3000);
     
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
                    <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
                </ul>
            </nav>
            
            <div className="main-body">

            <div className="location-modal d-none">
		       <p>Kindly provide the new location for this order below and click on the submit button</p>
			   
			   <input type="text" className="new-location" placeholder="Enter new location" value={newLocation} onChange={updatedLocation}/>
			   
			   <p><button onClick={updateNewLocation}>Submit</button></p>
		   </div>


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
                            <p className="order"><span className="order-username">{order.username}</span><button className="details-btn"><Link to={`/app-order/${order._id}`}>Details</Link></button><button className="status" onClick={()=>{changeStatus(order._id)}}>Status: <span className={order.status==="pending" ? "red" : "status-state"} >{order.status}</span></button><button className="location" onClick={()=>{changeLocation(order._id)}}>Pres-Location: <span className="present-location" >{order.preslocation}</span></button></p> 
                         </div> : ""
                        )) }
                        
                    </div>
                    
                </div>
            </div>
        
        </div>
    );
}

export default GetAllAppOrders;
