import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom";

const CaptainLogin=() =>{
    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[captainData,setCaptainData]=useState({});


    const submitHandler=(e)=>{
        e.preventDefault();

        setCaptainData({
            email:email,
            password:password
        });
        console.log(captainData);
        
        setEmail('');
        setPassword('');
    }


return(
        <div className="p-7 h-screen flex flex-col justify-between">

        <div className="mb-2">

            <img className="w-16 mb-10" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s"></img>
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
            <p className="text-center-align"> Want to be a Captain? <Link to="/CaptainSign" className="text-[#10b461]">Register as Captain</Link></p>
            </div>

        <Link className="bg-[#f3c164] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-white font-semibold flex items-center justify-center" to="/login"> Sign in as User</Link>
    </div>
    )
}


export default CaptainLogin