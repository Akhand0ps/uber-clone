import React, { useEffect , useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";





const UserProtectedWrapper = ({ children }) => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const{ser,setUser} = useContext(UserDataContext);
    const[isLoading,setIsLoading] = useState(true);



    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]); // Dependency array


    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        if(response.status===200){
            const data = response.data;
            setUser(data.user);
            setIsLoading(false);
        }
    }).catch(err=>{
        console.log(err);
        localStorage.removeItem('token');
        navigate('/login');
    })



    return <div>{children}</div>;
};

export default UserProtectedWrapper;
