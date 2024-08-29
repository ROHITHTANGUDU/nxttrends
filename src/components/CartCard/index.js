import "./index.css";
import { useContext } from "react";
import Cartcontext from "../../context/CartContext";
import { Link } from "react-router-dom";

const CartCard = (props)=>{
    const {each} = props;
    const {image_url,title,brand,price,count} = each
    // const contextdata = useContext(Cartcontext)
    // const {cartarray} = contextdata
    const contextdata = useContext(Cartcontext);
    const {increase,decrease,removeproductfromcart} = contextdata

    const onclickplus = ()=>{
        increase({...each})
    }

    const onclickminus = ()=>{
        decrease({...each})
    }

    const removeproduct = ()=>{
        removeproductfromcart(each.id);

    }

    

    return(
        
        <li className = "list-cart-card">
            
            <div className = "image-title-brand">
                <Link to = {`/product/${each.id}`}> 
                    <img src = {image_url} className = "card-image"/>
                </Link>
                <div className = "title-brand">
                    <h3>{title}</h3>
                    <h5>{brand}</h5>
                </div>
                
            </div>
            
            <div className = "second-part-cart-card">
                <div className="buttons">
                    <button className="plus-button" onClick={onclickminus} >
                        -
                    </button>
                    <p>{count}</p>
                    <button className = "minus-button" onClick={onclickplus}>
                        +
                    </button>
                </div>
                <p>
                    {`Rs : ${price}`}
                </p>
                {count >0 &&<button>{price * count}</button>}
                <button onClick={removeproduct}>
                    *
                </button>
                
            </div>
           
            
        </li>
       
    )
}


export default CartCard