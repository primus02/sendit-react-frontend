import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";


function SignUp(props){

    useEffect(()=>{
        const imageChanger = setInterval(()=>{
             changeImage();
        }, 5000);

        return ()=> clearInterval(imageChanger);
    }, []);

    const url = "https://sendit.herokuapp.com";

    let counter = 0;
    const images= ["/static/delivery1.jpg", "/static/delivery2.jpg", "/static/delivery-bus.jpg", "/static/delivery parcel.jpg", "/static/delivery3.jpg"];
   const imageRef = useRef();

     function changeImage(){
        if(counter===images.length){
            counter=0;
        }
        else if(counter === 0){
            counter = images.length-1
        }
        imageRef.current.src = images[counter];
        counter++
    }
  
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const updateName =(e)=>{
      setName(e.target.value);
  };

  const updateUsername =(e)=>{
    setUsername(e.target.value);
};

const updateEmail =(e)=>{
    setEmail(e.target.value);
};

const updatePassword =(e)=>{
    setPassword(e.target.value);
};

const createUser=(e)=>{
   e.preventDefault();

    fetch(`${url}/signup`, {
        // mode: "no-cors",
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        // credentials: "include",
        body: JSON.stringify({
          name,
          username: username.toLowerCase(),
          email,
          password
          
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if(res.message === "Mail exists"){
            toast.info('Mail exists!');
    
           return false;
          }
          else if(res.message === "Username already exists"){
            toast.info('Username exists!');

           return false;
          }
          else if (res.data) {
                toast.success('Account successfully created!');
              
              setTimeout(()=>{props.history.push("/");},3000);
                  
              
                } else if (res.error) {
                  console.log("error", res.err);
                 toast.error(res.err);
                }
              })
        .catch((err) => console.log("err occured", err));
};


    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/">Home Page</Link></li>
                    <li className="admin"><Link to="/admin">Admin</Link></li>
                    <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
                </ul>
            </nav>
        
            <div className="sign">
            
                <h3>Register Here</h3>
                
                <form id="myform" onSubmit={createUser}>
                    <label>Name:</label>
                    <input type="text" className="input-name" placeholder="Enter your name!" value={name} onChange={updateName} required/><br></br>
                    
                    <label>Username:</label>
                    <input type="text" className="input-username" placeholder="Enter a username!" value={username} onChange={updateUsername} required/><br></br>
                    
                    <label>Email Address:</label>
                    <input type="email" className="input-email" placeholder="Enter a valid email!" value={email} onChange={updateEmail} required/><br></br>
                    
                    <label>Password:</label>
                    <input type="password" className="input-password" placeholder="Enter a passowrd!" value={password} onChange={updatePassword} required />
                    
                    <p><button type="submit" className="create-acct">Create Account</button></p>
                    
                </form>

            </div>
        
            <div className="main-body">
                <header>
                    <h1> Welcome to <emp>SendIt!</emp></h1>
                    <p>SendIT is a courier service that helps users deliver parcels to different destinations.<br></br> SendIT provides quotes based on weight categories and offer services all over the country.</p>
                </header>


                <div className="body">
                    <img src="/static/delivery1.jpg" alt="delivery" ref={imageRef}/>
            
                </div>
            </div>
        </div>
    );
}

export default SignUp;
