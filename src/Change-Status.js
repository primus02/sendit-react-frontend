import React, {useState} from "react";
import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";




function ChangeStatus(props){

    const username = localStorage.getItem("username");
    const url = "https://sendit.herokuapp.com";
   const token = localStorage.getItem("token");

    const [status, setStatus]= useState("");

    const updateStatus=(e)=>{
          setStatus(e.target.value);
    };

    const changeOrderStatus=()=>{
        if(status === ""){
            toast.warning("Status field cannot be left empty!");
            return;
        }
        else{
            fetch(`${url}/change-status/${props.match.params.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json", 
             Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            status: status.toLowerCase()
        })
    })
    .then(res=> res.json())
    .then(res=>{
        if(res.message=== `Order ${props.match.params.id} updated successfully`){
            
           toast.success("Success, order's new status updated!");
            
            setTimeout(()=>{ props.history.push("/all-app-orders");}, 3000);
            
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
             <li><Link to="/all-app-orders">Get all orders</Link></li>
             <li className="sign-out" onClick={signOut}>Sign out</li>
             <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
           </ul>
       </nav>
       
       
       
       <div className="main-body">
           <header>
			   <h1> Hello Admin <span className="username">{username}</span>!</h1>
			   <p>Enter the new order status below</p>
           </header>


           <div className="body">
               
               <label>Order Status: </label>
               <input type="text" className="input-status" placeholder="order status" value={status} onChange={updateStatus}/>
               
               <p><button onClick={changeOrderStatus}>Submit</button></p>
           </div>
       </div>
       
       </div>
    );
}

export default ChangeStatus;