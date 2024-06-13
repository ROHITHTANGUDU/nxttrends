import { useState } from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Login = ()=>{
    const navigate = useNavigate()
    const [state,setstate] = useState({
        username : "",
        password : "",
        errormsg : ""
    })
    
    const token = Cookies.get("jwt");
    if(token !== undefined){
        return <Navigate to ="/home"/>
    }

    const usernameevent = (event)=>{
        setstate((prevstate)=>{
            return {...prevstate,username : event.target.value}
        })
    }

    const passwordevent = (event)=>{
        setstate((prevstate)=>{
            return {...prevstate,password : event.target.value}
        })
    }



    // const loginfun = async ()=>{
    //     let userdetails ={
    //         username : state.username,
    //         password : state.password
    //     }
    //     let obj = {
    //         method : "POST",
    //         body : JSON.stringify(userdetails)
    //     }

    //     let response = await fetch("https://apis.ccbp.in/login" , obj)
    //     let data = await response.json();
    //     console.log(response)
    //     console.log(data);
    //     if(response.ok)
    //     {
    //         //Cookies.set("jwt-token" , data.jwt_token , {expires : 30})
    //         navigate("/") // when there is a button clik the useNavigate() hook
    //     }

    // }

   
    
    const clicklogin = async ()=>{
        const userdetails = {
            username : state.username,
            password : state.password
        }
        let obj = {
            method : "POST",
            body : JSON.stringify(userdetails)
        }

        const response = await fetch("https://apis.ccbp.in/login" , obj)
        console.log(response)
        
        if(response.ok){
            const data = await response.json()
            Cookies.set("jwt" , data.jwt_token, {expires:30})
            navigate("/home")
        }
        else{
            setstate((prevstate)=>{
                return{...prevstate,errormsg : "Login Failed"}
            })

        }
        

    }


    return(
        <div className = "login-back">
            {console.log(state.password)}
            <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" alt = "login-image" className = "login-image"/>
            <div className = "login-form">
                <img src ="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" className = "website-logo"/>
                <label className = "label-element">USERNAME</label>
                <input type= "text" className= "input-text" placeholder="username" onChange={usernameevent}/>
                <label className = "label-element">PASSWORD</label>
                <input type= "password" className= "input-text" placeholder="Password" onChange={passwordevent}/>
                <button className = "login-button" onClick={clicklogin}>
                    Login
                </button>
                <p className="error-msg">{state.errormsg}</p>
            </div>
        </div>
    )

}

export default Login