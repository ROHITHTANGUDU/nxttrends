import "./index.css";

import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Header = ()=>{
    const navigate = useNavigate()
    const logoutfunction = ()=>{
        console.log(Cookies.get("jwt"));
        Cookies.remove("jwt")
        navigate("/login")
    }
    return(
        <div className ="header-back">
            <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" className = "home-logo"/>
            <div className = "header-labels">
                <Link className = "header-label" to= "/home">
                    <h3 >
                        Home
                    </h3>
                </Link>
                <Link className = "header-label" to ="/products">
                    <h3 >
                        Products
                    </h3>
                </Link>
                <Link className = "header-label" to ="/cart">
                    <h3 >
                        cart
                    </h3>
                </Link>
                <button className = "logout-button" onClick={logoutfunction}>
                    Logout
                </button>
            </div>
        </div>

    )

}

export default Header