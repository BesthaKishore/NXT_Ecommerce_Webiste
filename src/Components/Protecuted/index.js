import { useEffect } from "react";

import { useNavigate, Outlet } from "react-router-dom"

import Cookies from "js-cookie"

function Protecuted(){
    const navigation = useNavigate();

    useEffect(() => {
        
        const jwt_token = Cookies.get("jwtToken");

        if (jwt_token === undefined){
            navigation("/login");
        }
    },[navigation])
    return <Outlet />;
}

export default Protecuted;