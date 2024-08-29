import "./index.css";
import { useContext } from "react";
import Cartcontext from "../../context/CartContext";
import CartCard from "../CartCard";
import Header from "../Header";


const Cart = ()=>{
    const contextdata = useContext(Cartcontext)
    const {cartarray,emptycart} = contextdata;
    const emptycartview = ()=>{
        return(
            <h1>
                empty cart
            </h1>
        )
    }
    
   
    // const rendertotalprice = ()=>{
    //     const totalpriceval = cartarray.reduce((acc,curr)=>{
    //         return acc+(curr.price * curr.count)
    //     })
    //     return totalpriceval;
    // }

    const rendercartview = ()=>{
        return(
            <ul className = "cart-card">
                {cartarray.map((each)=>{
                    console.log(each);
                    return <CartCard each ={each} key = {each.id}/>
                })}
                {cartarray.length > 0 &&<h1 className = "total-cost">{cartarray.reduce((acc,curr)=>{
                    return acc + (curr.price * curr.count)
                },0)}</h1>}
                
            </ul>
        )
    }

    const onemptycart = ()=>{
        emptycart()
    }


    return(
        <div>
            <Header/>
            <div className = "cart-back">
                <div className = "remove-all-container">
                    <button className = "remove-all-button" onClick={onemptycart}>
                        Remove All
                    </button>
                </div>
                <h1>
                    My cart
                </h1>
                <div>
                    {cartarray.length > 0 ? rendercartview(): emptycartview()}
                </div>
            </div>

        </div>
        
        
        
    )
}

export default Cart