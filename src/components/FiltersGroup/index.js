import "./index.css";
import { FaStar } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
import AllproductsContext from "../../context/AllproductsContext";
import { useContext, useState } from "react";


const FiltersGroup = ()=>{
    const contextdata = useContext(AllproductsContext);
    const {categoryfunction,clearfilter,clickrating} = contextdata



    const clickcategory = (event)=>{
        categoryfunction(event.target.getAttribute("value"))
       
        
    }

    const onclickclearfilters = ()=>{
        clearfilter()

    }

    const onclickrating = (event)=>{
        const rating = (event.currentTarget.getAttribute("value"))
        clickrating(rating);
    }
    
    return(
        <div className = "filters-back">
            <h4>
                Category
            </h4>
            <p className = "category" value = "" onClick={clickcategory} >
                All
            </p>
            <p className = "category" value = "1" onClick={clickcategory} >
                Clothing
            </p>
            <p className = "category" value = "2" onClick={clickcategory}>
                Electronics
            </p>
            <p className ="category" value = "3" onClick={clickcategory}>
                Appliances
            </p>
            <p className = "category" value = "4" onClick={clickcategory}>
                Grocerys
            </p>
            <p className = "category" value = "5" onClick={clickcategory}>
                Toys
            </p>
            <h4 className="category-heading">
                Rating
            </h4>
            <div className = "star-rating" value = "4" onClick={onclickrating}>
                <FaStar className="star-color"/>
                <FaStar className="star-color"/>
                <FaStar className="star-color"/>
                <FaStar className="star-color"/>
                <CiStar />
                <span>& up</span>
            </div>
            <div className = "star-rating" value = "3" onClick={onclickrating}>
                <FaStar className="star-color"/>
                <FaStar className="star-color"/>
                <FaStar className="star-color"/>
                <CiStar className="star-color"/>
                <CiStar />
                <span>& up</span>
            </div>
            <div className = "star-rating" value = "2" onClick={onclickrating}>
                <FaStar className="star-color"/>
                <FaStar className="star-color"/>
                <CiStar/>
                <CiStar />
                <CiStar />
                <span>& up</span>
            </div>
            <div className = "star-rating" value = "1" onClick={onclickrating}>
                <FaStar className="star-color"/>
                <CiStar />
                <CiStar />
                <CiStar />
                <CiStar />
                <span>& up</span>
            </div>
            <button className= "clear-filters-button" onClick={onclickclearfilters}>
                Clear Filters
            </button>

            


        </div>
    )
}

export default FiltersGroup;