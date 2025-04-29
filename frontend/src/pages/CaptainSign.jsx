import React, {useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CaptainHome from "./CaptainHome";

const CaptainSign=() =>{

    const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[firstname,setFirstname]=useState('');
    const[lastname,setLastname]=useState('');
    const[vehicleColor,setVehicleColor] = useState("");
    const[vehiclePlate,setVehiclePlate] = useState("");
    const[vehicleCapacity,setVehicleCapacity] = useState("");
    const[vehicleType,setVehicleType] = useState("");

    
    const {captain,setCaptain} = useContext(CaptainDataContext);
    
    const navigate = useNavigate();
    
    const submitHandler= async (e)=>{
        e.preventDefault();

        const CaptainData = {
            fullname:{
                firstname:firstname,
                lastname:lastname
            },
            email:email,
            password:password,
            vehicle:{
                color:vehicleColor,
                plate:vehiclePlate,
                capacity:vehicleCapacity,
                vehicleType:vehicleType

            }
        }

        try{
            console.log("ye chla ")
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,CaptainData);
            console.log(response);

            if(response.status ===201){
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('token',data.token);
                navigate("/captain-home");

                setEmail('');
                setPassword('');
                setFirstname('');
                setLastname('');
                setVehicleColor('');
                setVehiclePlate('');    
                setVehicleCapacity('');
                setVehicleType('');
            }
        }catch(err){
            console.error(err);
        }

    }
    
    return(
        <div className="p-7 h-screen flex flex-col justify-between">

        <div className="mb-2">

            <img className="w-16 mb-7" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmoJcsV2aZSkAm3nmwtyjuiekrT3H5U7pvjQ&s"></img>
            <form onSubmit={(e)=>{
                submitHandler(e);
            }}>

                 <h3 className="text-lg  font-medium mb-2">What's your name</h3>
                    <div className="flex gap-4 mb-3">

                    <input  required
                    type='text'
                    className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                    value={firstname}
                    onChange={(e)=>{
                        setFirstname(e.target.value);
                    }}
                    placeholder="firstname"/>

                

                    <input  required
                    type='text'
                    className="bg-[#eeeeee]  rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                    value={lastname}
                    onChange={(e)=>{
                        setLastname(e.target.value);
                    }}
                    placeholder="lastname"/>


                    </div>

                <h3 className="text-lg font-medium mb-2">What's your email</h3>

                <input  required
                type='email'
                className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                value={email}
                onChange={(e)=>{
                    setEmail(e.target.value)
                }} 
                placeholder="email@example.com"/>

                <h3 className="text-lg font-medium mb-2" >What's your password</h3>
                
                <input  required 
                className="bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-lg placeholder:text-base"             
                type='password' 
                value={password}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }} 
                placeholder="pass@0000"/>


                <h3 className="text-lg font-medium mb-2" >Enter your vehicle details</h3>

                <div className="flex flex-row justify-between gap-3">

                    <input  required 
                    className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"             
                    type='text' 
                    value={vehicleColor}
                    onChange={(e)=>{
                        setVehicleColor(e.target.value)
                    }} 
                    placeholder="Vehicle Color"/>

                    <input  required 
                    className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"             
                    type='text' 
                    value={vehiclePlate}
                    onChange={(e)=>{
                        setVehiclePlate(e.target.value)
                    }} 
                    placeholder="Plate Number"/>


                </div>
                
                <div className="flex flex-row justify-between gap-3">

                    <input  required 
                    className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"             
                    type='number' 
                    value={vehicleCapacity}
                    onChange={(e)=>{
                        setVehicleCapacity(Number(e.target.value));
                    }} 
                    placeholder="Vehicle Capacity"
                    />
                    
                    <select
                    required
                    className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base cursor-pointer"
                    value={vehicleType}
                    onChange={(e) => {
                        setVehicleType(e.target.value);
                    }}
                    >
                        
                        <option value="">Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="auto">Auto</option>
                        
                    </select>

                </div>

                <button
                className="bg-[#111] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-white font-semibold cursor-pointer" 
                >
                Register</button>
            </form>
            <p className="text-center"> Already have an account? <Link to="/CaptainLogin" className="text-[#10b461]">Login in here</Link></p>
            </div>

        <Link className="bg-[#f3c164] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base text-white font-semibold flex items-center justify-center" to="/captainlogin"> Sign in as Captain</Link>
    </div>
    )
}


export default CaptainSign