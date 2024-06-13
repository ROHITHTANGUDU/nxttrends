import "./index.css";
import ProductsHeader from "../ProductsHeader";
import FiltersGroup from "../FiltersGroup";
import { useContext, useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import AllproductsContext from "../../context/AllproductsContext";



const AllProducts = ()=>{

    const contextdata = useContext(AllproductsContext)
    const {getallproductsdata,allproductsdata,allproductsdataflag} = contextdata
    

    useEffect(()=>{
        getallproductsdata()
    },[])


    const renderallproducts = ()=>{
        console.log(allproductsdata)
        return(
            <ul className="un-list">
                {allproductsdata.map((each)=>{
                    return <ProductCard each= {each} key = {each.id}/>
                })}
            </ul>
        )
    }

    const renderfailview=()=>{

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