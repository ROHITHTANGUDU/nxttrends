import { Link } from "react-router-dom";
import React from "react";
import "./index.css";

const ProductCard = (props) => {
    const  {each} = props;
    const {id,brand,image_url,price,rating,title} = each;
  return (
    <Link to = {`/product/${id}`}>
      <li className = "productcard-back">
        <img src = {image_url} className = "prime-deals-product-image" alt= "prime-image"/>
        <h3>{title}</h3>
        <p>by {brand}</p>
        <p className = "price">{`Rs : ${price} /-`}</p>
        <div className="rating">
          <button> {rating}</button> 
        </div>
        
      </li>
    </Link>
  );
};

export default ProductCard

