import "./index.css";
import Header from "../Header";
import { useNavigate } from "react-router-dom";

const Home = ()=>{
    const navigate = useNavigate()
    const  shopnow = ()=>{
        navigate("/products");
    }
    return(
        <div>
            <Header/>
            <div className="home-back">
                <div className = "home-content">
                    <h1>
                        Clothes That Get You Notice

                    </h1>
                    <p>
                    When invalid credentials are provided in the login form and Login button is clicked, then the respective error message from the response should be displayed
                    When the username and password are provided correctly and Login button is clicked, then the page should navigate to Home Route
                    </p>
                    <button className = "shopnow-button" onClick={shopnow}>
                        Shop Now
                    </button>
                </div>
                <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png" className = "home-image" alt = "home-image"/>

            </div>
        </div>
    )

}

export default Home