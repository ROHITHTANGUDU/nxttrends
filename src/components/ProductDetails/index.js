import { useEffect, useState } from "react";
import "./index.css";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { FaStar } from "react-icons/fa";
import Header from "../Header";
import ProductCard from "../ProductCard";
import { useContext } from "react";
import Cartcontext from "../../context/CartContext";

const ProductDetails = ()=>{
    const {id} =useParams();
    const [state,setstate] = useState({
        prodata : {},
        prodataflag : false,
        count : 0,
        buttonsflag : false
    })

    const token = Cookies.get("jwt");

   

    useEffect(()=>{
        getproductdata()
        
    },[])


   


    const contextdata = useContext(Cartcontext)
    const {Addtocart,increase,cartarray,decrease} = contextdata

    

    useEffect(()=>{  
        let object = cartarray.find((each)=>{
            return each.id ===parseInt(id)
        })
        if(object){
            
            setstate((prevstate)=>{
                return{...prevstate,count : object.count}
            })
        }
    },[cartarray])


    // const onclickaddtocart = ()=>{
    //     setstate((prevstate)=>{
    //         const newcount = prevstate.count +1
    //         localStorage.setItem(`product-${id}-count`, newcount);
    //         // let updateddata = {...prevstate.prodata,count : newcount}
    //         Addtocart({...state.prodata},newcount)
    //         return{
    //             ...prevstate,count : newcount,
                
    //         }  
    //     })
       
    // }
    
    // const onclickremovefromcart = ()=>{
    //     setstate((prevstate)=>{
    //         const newcount = prevstate.count -1
    //         localStorage.setItem(`product-${id}-count`, newcount);
    //         let updateddata = {...prevstate.prodata,count : newcount}
    //         Addtocart({...updateddata})
    //         return{
    //             ...prevstate,count : newcount,
    //             prodata : updateddata
    //         }  
    //     })

    // }


    const onclickaddtocart = ()=>{
        let updatedproductdata = {...state.prodata,count : 1}
        increase({...updatedproductdata})
        // setstate((prevstate)=>{
        //     return{...prevstate,prodata : updatedproductdata,
        //         count : 1,
        //         buttonsflag : true
        //     }
        // })
    }

    const onclickincrease = ()=>{
        increase({...state.prodata})

    }
    const onclickdecrease = ()=>{
      
        decrease({...state.prodata})

    }





    

    const getproductdata = async () => {
        let obj = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await fetch(`https://apis.ccbp.in/products/${id}`, obj);
        if (response.ok) {
            const responsedata = await response.json();
            setstate((prevstate)=>{
                return{...prevstate,prodata : responsedata,prodataflag:true}
            })
        }
    }

    return(
        <>
            {console.log(state.count)}
            
            <Header/>
            <div className = "product-details-back">
                <img src = {state.prodata.image_url} className = "product-image"/>
                <div className = "product-details-card">
                    <h2>{state.prodata.title}</h2>
                    <p className = "price weight-property">{`Rs ${state.prodata.price}/-`}</p>
                    <div className = "rating-reviews-card">
                        <button className = "rating-button">
                            {state.prodata.rating}
                            <FaStar className="star"/>
                        </button>
                        <p className = "reviews">{state.prodata.total_reviews} reviews</p>
                    </div>
                    <p className = "description">
                        {state.prodata.description}
                    </p>
                    <h4 className ="availbility">{`Availbility: ${state.prodata.availability}`} </h4>
                    <h4 className ="brand">{`Brand: ${state.prodata.brand}`} </h4>
                    <hr/>
                    <div className = "minus-plus-buttons">
                        {state.count>0?<button onClick={onclickdecrease} >
                            -
                        </button>: null}
                        {/* <p>{state.count}</p> */}
                        {<p>{state.count}</p>}
                        {state.count>0? <button onClick = {onclickincrease}>
                            +
                        </button>:null}
                    </div>
                    {state.count===0? <button className="add-to-cart-button" onClick={onclickaddtocart}>
                        Add to cart
                    </button> : <p>Added</p> }
                </div>
            </div>
            <div className= "similarproducts">
                <h3 className="similarproducts-heading">
                    Similar Products
                </h3>
                <ul className="un-list">
                    {state.prodataflag &&state.prodata.similar_products.map((each)=>{
                       return <ProductCard each = {each} key = {each.id} />
                    })}

                </ul>
            </div>
            
        </>
        
    )

}

export default ProductDetails