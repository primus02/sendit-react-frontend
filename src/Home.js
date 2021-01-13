import React, {useRef, useEffect, useState} from "react";

import {Link} from "react-router-dom";
import  {toast, ToastContainer, Zoom} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import "./App.css";


function Home(props){

    useEffect(()=>{
        const imageChanger =setInterval(()=>{
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
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const updateEmail =(e)=>{
    setEmail(e.target.value);
};

const updatePassword =(e)=>{
    setPassword(e.target.value);
};

    const signInUser=()=>{

        if(email ==="" || password ===""){
             toast.warning("Kindly provide the appropriate field(s)");
            return;
        }
        else{
        fetch(`${url}/signin`, {
            
            method: "POST",
            headers: {
                Accept: "application/json, text/plain",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
            .then(res=>res.json())
            .then(res=>{
            
            if(res.message=== "Email does not exist" && password !== ""){
                toast.error("Kindly provide a valid email!");
                return false
            }
            else if(res.message=== "Auth failed"){
                toast.error("Kindly provide a valid password!");
                return false
            }
            else if(res.token){
                localStorage.setItem("token", res.token);
                localStorage.setItem("username", res.data[0].username);
                localStorage.setItem("name", res.data[0].name);
                localStorage.setItem("email", res.data[0].email);
                
                toast.success("Sign in successfull!");
                
                setTimeout(()=>{
                    props.history.push("/user");
                },3000);  
            }
        })
            .catch(err=>{
            console.log("Error: ", err);
        });
        }
    };

    return(
        <div>
            <nav> 
                <ul className="nav">
                    <li><Link to="/about-us">About Us</Link></li>
                    <li><Link to="/contact-us">Contact Us</Link></li>
                    <li className="admin"><Link to="/admin">Admin</Link></li>
                    <ToastContainer draggable={false} transition={Zoom} autoClose={3000}/>
                </ul>
            </nav>
        
            <div className="sign">
            
                <div className="sign-page">
                    <p className="sign-up">Click here to create an account <Link to="/sign-up" className="sign-up-btn">Sign Up</Link></p>

                    <p className="sign-in">Already a member? Sign in here </p>
                    <p><input type="email" className="email" placeholder="email" value={email} onChange={updateEmail}/></p>

                    <p><input type="password" className="password" placeholder="password" value={password} onChange={updatePassword}/></p>
                    <p><button className="sign-in-btn" onClick={signInUser}>Sign In</button></p>
                </div>

            </div>
       
            <div className="main-body">
                <header>
                    <h1> Welcome to <emp>SendIt!</emp></h1>
                    <p>SendIT is a courier service that helps users deliver parcels to different destinations. <br></br> SendIT provides quotes based on weight categories and offer services all over the country.</p>
                </header>


                <div className="body">
                    <img src="/static/delivery3.jpg" alt="delivery" ref={imageRef}/>

                    <div className="info">
                        <h2>How to get started?</h2>

                        <ol>
                            <li>You first need to create an account.<Link to="/sign-up">Sign Up</Link></li>
                            <li> Then, Sign into your account. <Link to="/send-it">Sign In</Link></li>
                            <li>Once signed in, you have access to the following available options: 
                                <ul>
                                    <li>Create a parcel delivery order</li> 
                                    <li>Get the list of your delivery orders</li>
                                    <li>View current status of your orders</li> 
                                    <li>Cancel a parcel deivery order</li>
                                    <li>Change the destination any of your delivery orders and many more!
                                    </li>
                                </ul>
                            </li>
                        </ol>
                    </div>       
                </div>
            </div>
        </div>
    );
}

export default Home;