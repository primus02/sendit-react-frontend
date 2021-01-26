import React, {useState} from "react";
import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";



function AdminSignin(props){

    const url = "https://sendit.herokuapp.com";

    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");

    const updateUsername=(e)=>{
        setUsername(e.target.value);
    };

    const updatePassword=(e)=>{
        setPassword(e.target.value);
    };

    const signInAdmin=()=>{
        if(username ==="" || password ===""){
            toast.warning("Kindly provide the appropriate field(s)");
           return;
       }
       else{
       fetch(`${url}/admin/signin`, {
           
           method: "POST",
           headers: {
               Accept: "application/json, text/plain",
               "Content-Type": "application/json"
           },
           body: JSON.stringify({
               username,
               password
           })
       })
           .then(res=>res.json())
           .then(res=>{
           
           if(res.message=== "Username invalid" || res.message=== "Password invalid" || res.message=== "Auth failed"){
               toast.error("invalid username / password!");
               return;
           }
           else if(res.token){
               localStorage.setItem("token", res.token);
               localStorage.setItem("username", res.data[0].username);
               localStorage.setItem("isAdminLoggedIn", true);
               
               toast.success("Successfully signed in");
              
               setTimeout(()=>{ props.history.push("/admin-profile"); }, 3000);
               
           }
       })
           .catch(err=>{
           console.log("Error", err);
       });
       }
   
    };

    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/about-us"> About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/">Home Page</Link></li>
                    <li className="admin"><Link to="/admin">Admin</Link></li>
                    <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
                </ul>
            </nav>
        
            <div className="sign">
                <div>
                    
                    <p className="sign-in">Admin? Sign in here </p>
                        
                    <p><input type="text" className="admin-user" placeholder="username" value={username} onChange={updateUsername}/></p>

                    <p><input type="password" className="password" placeholder="password" value={password} onChange={updatePassword}/></p>
                    <p><button className="admin-signin" onClick={signInAdmin}>Sign In</button></p>
                </div>

            </div>
        
            <div className="main-body">
                <header>
                    <h1> Welcome to <emp>SendIt!</emp></h1>
                    <p>SendIT is a courier service that helps users deliver parcels to different destinations.<br></br> SendIT provides quotes based on weight categories and offer services all over the country.</p>
                </header>


                <div className="body">
                    <img src="/static/delivery-bus.jpg" alt="delivery-bus"/>
                    <img src="/static/parcel.jpg" alt="parcel"/>

                </div>
            </div>
       
        </div>
    );
}

export default AdminSignin;
