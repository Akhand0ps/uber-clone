import React, { useEffect,useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const{captain,setCaptain} = useContext(CaptainDataContext);

    const[isLoading,setIsLoading] = useState(true);

    useEffect(() => {
        
        if (!token) {
            navigate('/CaptainLogin');
        }
    }, [token, navigate]); // Dependency array


    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`,{

        headers:{
            Authorization:`Bearer ${token}`
        }
    }).then((response)=>{
        if(response.status === 200){
            const data = response.data;
            setCaptain(data.captain);
            setIsLoading(false);
        }
    }).catch(err=>{
        console.log(err);
        localStorage.removeItem('token');
        navigate('/CaptainLogin');
    })


    return <div>{children}</div>;
};

export default CaptainProtectedWrapper;
