import { useState, useEffect } from "react"

import { useNavigate } from "react-router-dom"

import Cookies from "js-cookie"

import "./index.css"

function LoginForm(){

    const [username, setusername] = useState("");

    const [password, setpassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");

    const [ShowErrorMsg, setShowErrorMsg] = useState(false);

    const navigation = useNavigate();

    const onchangeUsername = e => {
        setusername(e.target.value);
    }

    const onchangePassword = e => {
        setpassword(e.target.value);
    }

    const onSubmitSuccess = Token => {
        Cookies.set("jwtToken", Token, {expires : 30});
        setShowErrorMsg(false);
        navigation("/");
    }

    const onSubmitFailure = Msg => {
        setErrorMsg(Msg);
        setShowErrorMsg(true);
    }

    const onsubmitForm = async e => {
        e.preventDefault();

        const userDetails = {username, password};

        const LoginApi = 'https://apis.ccbp.in/login';

        const options = {
            method : "POST",
            body : JSON.stringify(userDetails)
        }

        const response = await fetch(LoginApi, options);

        const data = await response.json();

        if (response.ok === true){
            onSubmitSuccess(data.jwt_token);
        }else{
            onSubmitFailure(data.error_msg)
        }

    }

    useEffect (() => {

    const jwt_token = Cookies.get("jwtToken");

    if (jwt_token !== undefined){
        navigation("/");
    }
    },[navigation])

    return(
        <div className="Login_bg_container">
            <div className="Login_card_container">
                <img className="Mobile_divice_logo" src ="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" />
                <img className="websit_login" src ="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" alt = "website login" />
                <div className ="Login_details_container">
                <img className="Laptop_divice_logo" src ="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" />
                <form className ="Form_contaienr" onSubmit={onsubmitForm}>
                <div className = "Search_container">
                    <label className="label" htmlFor = "USERNAME">USERNAME</label>
                    <input type = "text" className = "search" placeholder ="Username: rahul" id ="USERNAME" value={username} onChange={onchangeUsername}/>
                </div>
                <div className = "Search_container">
                    <label className="label" htmlFor = "PASSWORD">PASSWORD</label>
                    <input type = "password" className = "search" placeholder ="Password: rahul@2021"  id ="PASSWORD" value={password} onChange={onchangePassword}/>
                </div>
                <button type = "submit" className="submit_btn">Submit</button>
                {ShowErrorMsg ? (<p className="error_msg">*{errorMsg}</p>) : null}
                </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm;