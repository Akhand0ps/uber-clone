import React from "react";
import { Link ,  useNavigate} from "react-router-dom";
import { useState ,} from "react";
import axios from "axios";
import {UserDataContext} from "../context/UserContext";
import { useContext } from "react";

const UserSign=() =>{

    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[firstname,setFirstname]=useState('');
    const[lastname,setLastname]=useState('');
    ``
    
    const navigate = useNavigate();
    const {user,setUser} = useContext(UserDataContext);
    // console.log(user);

    
        const submitHandler= async(e)=>{
            e.preventDefault();

            const newUser = {
                fullname:{
                    firstname:firstname,
                    lastname:lastname
                },
                email:email,
                password:password
            }

            // console.log(newUser);
           
            try {
                const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
                // console.log(response);
            
                if (response.status === 201) {
                    const data = response.data;
                    setUser(data.user);
                    localStorage.setItem('token',data.token);
                    navigate('/home');
                    setEmail('');
                    setPassword('');
                    setFirstname('');
                    setLastname('');
                }
                
            } catch (error) {
                console.error("Registration error:", error.response ? error.response.data : error.message);
                // Maybe show error to user
            }
            
        }
       

    return(
        <div className="p-7 h-screen flex flex-col justify-between">

            <div className="mb-2">

                <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"></img>
                <form action="" onSubmit={(e)=>{
                    submitHandler(e);
                }}>

                <h3 className="text-base w-1/2 font-medium mb-2">What's your name</h3>
                    <div className="flex gap-4">

                    <input  required
                    type='text'
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                    value={firstname}
                    onChange={(e)=>{
                        setFirstname(e.target.value);
                    }}
                    placeholder="firstname"/>

                

                    <input  required
                    type='text'
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                    value={lastname}
                    onChange={(e)=>{
                        setLastname(e.target.value);
                    }}
                    placeholder="lastname"/>


                    </div>



                    <h3 className="text-lg font-medium mb-2">What's your email</h3>

                    <input  required
                    type='email'
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value);
                    }}
                    placeholder="email@example.com"/>

                    <h3 className="text-lg font-medium mb-2" >What's your password</h3>
                    
                    <input  required 
                    className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base"             
                    type='password' 
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                    placeholder="pass@0000"/>

                    <button
                    className="bg-[#111] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-white font-semibold" 
                    >
                    Create Account</button>
                </form>
                <p className="text-center"> Already have an account? <Link to="/login" className="text-[#10b461]">Login here</Link></p>
                </div>

            {/* <Link className="bg-[#10b461] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-white font-semibold flex items-center justify-center" to="/Captainlogin"> Sign in as Captain</Link> */}

            <p className="text-sm l eading-tight ">
                By signing up, you agree to our <span className="text-[#10b461]">Terms</span> and <span className="text-[#10b461]">Privacy Policy</span>
            </p>
        </div>
    )
}


export default UserSign