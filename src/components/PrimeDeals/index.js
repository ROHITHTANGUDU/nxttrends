import "./index.css";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import ProductCard from "../ProductCard";

const PrimeDeals = ()=>{
    const [deals,setdeals] = useState({
        dealsdata:[],
        dealsflag : true
    });

    const token = Cookies.get("jwt");
    

    const getprimedealsdata = async ()=>{
        const obj = {
            method : "GET",
            headers :{
                Authorization : `Bearer ${token}`
            }
        }

        const response = await fetch("https://apis.ccbp.in/prime-deals" , obj);
        if(response.ok){
            const data = await response.json()
            setdeals((prevstate)=>{
                return{...prevstate,dealsdata : data.prime_deals,dealsflag : true} //change to true
            })
        }
        else{
            setdeals((prevstate)=>{
                return{...prevstate,dealsflag : false}
            })
        }
    


    }

    useEffect(()=>{
        getprimedealsdata()
    },[])


    const displayprimedeals= ()=>{
        return(
        <ul className = "un-list">
            {deals.dealsdata.map((each)=>{
                return <ProductCard each = {each} key = {each.id}/>
            })}

        </ul>)

    }

    const failureview = ()=>{
        return(
            <img src = "https://assets.ccbp.in/frontend/react-js/exclusive-deals-banner-img.png" className = "failure-image"/>
        )
        

    }


    

    return(
        <div className = "primedeals-back">
            {deals.dealsflag ? displayprimedeals() : failureview()}
        </div>
    )

}

export default PrimeDeals