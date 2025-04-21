import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserLogin=() =>{
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[userData,setUserData]=useState({});


    const submitHandler=(e)=>{
        e.preventDefault();

        setUserData({
            email:email,
            password:password
        });
        console.log(userData);
        
        setEmail('');
        setPassword('');
    }


    return(
        <div className="p-7 h-screen flex flex-col justify-between">

            <div className="mb-2">

                <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"></img>
                <form action="" onSubmit={(e)=>{
                    submitHandler(e);
                }}>

                    <h3 className="text-lg font-medium mb-2">What's your email</h3>

                    <input  required
                    type='email'
                    className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }} 
                    placeholder="email@example.com"/>

                    <h3 className="text-lg font-medium mb-2" >What's your password</h3>
                    
                    <input  required 
                    className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"             
                    type='password' 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }} 
                    placeholder="pass@0000"/>

                    <button
                    className="bg-[#111] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-white font-semibold" 
                    >
                    Login</button>
                </form>
                <p className="text-center-align"> Don't have an account? <Link to="/Sign" className="text-[#10b461]">Create an account</Link></p>
                </div>

            <Link className="bg-[#10b461] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-white font-semibold flex items-center justify-center" to="/Captainlogin"> Sign in as Captain</Link>
        </div>
    )
}


export default UserLogin