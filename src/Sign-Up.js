import React, {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";

const google = window.google ? window.google : {};


function SignUp(props){

    const [address, setAddress] = useState("");


    useEffect(()=>{
       
    let  autocomplete = new google.maps.places.Autocomplete(
        (document.getElementsByClassName('input-address')[0]),

        { types: ['geocode']});


    google.maps.event.addListener(autocomplete, 'place_changed', function() {

           completeAddress(autocomplete);

    });

    const completeAddress=()=>{
        setAddress(document.getElementsByClassName('input-address')[0].value);
      };

    const imageChanger = setInterval(()=>{
             changeImage();
        }, 5000);

        return ()=> clearInterval(imageChanger);

    });


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
    const [mobile, setMobile] = useState("");
    // const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password1, setPassword1] = useState("");

  const updateName =(e)=>{
      setName(e.target.value);
  };

  const updateUsername =(e)=>{
    setUsername(e.target.value);
};

const updateMobile =(e)=>{
    setMobile(e.target.value);
};

const updateAddress =(e)=>{
    setAddress(e.target.value);
};

const updateEmail =(e)=>{
    setEmail(e.target.value);
};

const updatePassword =(e)=>{
    setPassword(e.target.value);
};

const updatePassword1 =(e)=>{
    setPassword1(e.target.value);
};


const createUser=(e)=>{
   e.preventDefault();
       if(password.length < 6){
           toast.info("Password must be atleast 6 characters");
           return false;
       }
       if(password !== password1){
           toast.error("Passwords must match");
           return false;
       }
       
else{
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
          mobile,
          address,
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
            }
};



    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li><Link to="/">Sign In</Link></li>
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
                    
                    <label>Mobile-No:</label>
                    <input type="tel" className="input-mobile" placeholder="example: +2348012345678"  pattern="\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$" value={mobile} onChange={updateMobile} required/><br></br>

                    <label>Contact Address:</label>
                    <input type="text" className="input-address" placeholder="Enter your address!" value={address} onChange={updateAddress} required/><br></br>

                    <label>Email Address:</label>
                    <input type="email" className="input-email" placeholder="Enter a valid email!" value={email} onChange={updateEmail} required/><br></br>
                    
                    <label>Password:</label>
                    <input type="password" className="input-password" placeholder="Enter a password!" value={password} onChange={updatePassword} required /><br></br>
                    
                    <label>Confirm Password:</label>
                    <input type="password" className="confirm-password" placeholder="Re-enter password!" value={password1} onChange={updatePassword1} required />

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
