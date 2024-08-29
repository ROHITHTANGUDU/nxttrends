import "./index.css";
import ProductsHeader from "../ProductsHeader";
import FiltersGroup from "../FiltersGroup";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import AllproductsContext from "../../context/AllproductsContext";



const AllProducts = ()=>{

    const contextdata = useContext(AllproductsContext)
    const {getallproductsdata,allproductsdata,allproductsdataflag,failimage} = contextdata
    

    useEffect(()=>{
        getallproductsdata()
    },[])


    const renderallproducts = ()=>{
       
        return(
            <ul className="un-list">
                {allproductsdata.map((each)=>{
                    return <ProductCard each= {each} key = {each.id}/>
                })}
            </ul>
        )
    }

    const renderfailview=()=>{
       
        if(failimage === ""){
            return(
                <img src = {failimage} alt = "no-products-image1" className = "no-products-image"/>
                
            )
        }
        return <img src = "https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png " alt = "no-products-image" className = "no-products-image"/>
        

    }
    return(
        <div className= "all-products-back">
            <ProductsHeader  />
            <div className="fliters-group-and-products">
                <FiltersGroup/>
                <div className= "all-products-products-card">
                    {allproductsdataflag ? renderallproducts() : renderfailview()}
                </div>
            </div>
        </div>

       
    )
}


export default AllProducts