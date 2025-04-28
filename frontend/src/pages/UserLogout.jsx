import React from "react";

import axios from "axios";


export const UserLogout = () =>{

    const token = localStorage.getItem('token')

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,
        {headers:
            {Authorization:`Bearer ${token}`}
        }
    ).then((res)=>{
        if(res.status === 200){
            localStorage.removeItem('token')
            Navigate("/login");
        }
    })
    .catch(err=>console.log(err))

    return (
        <div>
            UserLogout
        </div>
    )

    

}


export default UserLogout