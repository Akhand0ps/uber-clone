import React from "react";
import { Link } from "react-router-dom";

const Home=() =>{
    return(
        <div>
            <div className=" bg-cover bg-center bg-[url(https://plus.unsplash.com/premium_photo-1682048358624-8471ced24a65?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen flex justify-between flex-col w-full pt-8">

                <img className="w-16 ml-8" src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"></img>

                 <div className="bg-white py-5 px-4 pb-7">
                    <h2 className="text-3xl font-bold"> Get Started With Uber</h2>
                    <Link to="/login" className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5">Continue</Link>
                 </div>
            </div>
        </div>
    )
}


export default Home