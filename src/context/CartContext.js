import { createContext, useState } from "react";

import { useEffect } from "react";

const Cartcontext = createContext({
    cartarray : [],
    Addtocart : ()=>{},
    emptycart : ()=>{},
    increase : ()=>{},
    decrease : ()=>{},
    removeproductfromcart:()=>{}
    
})



export const CartProvider = ({children})=>{
    const [state,setstate] = useState({
        cartarray :[],
       
    })

    // const Addtocart = (prodata,quantity)=>{ 
    //     setstate((prevstate)=>{
    //         console.log(prevstate.cartarray);
    //         const existingproduct = prevstate.cartarray.findIndex((each)=>{
    //             return each.id === prodata.id
    //         })
    //         //console.log(existingproduct)
    //         let updatedprodata;
    //         if(existingproduct !== -1){
    //             updatedprodata = prevstate.cartarray.map((each,index)=>{
    //                 if(existingproduct === index){
    //                     return{...each,count : quantity }      
    //                 }
    //                 return each
    //             })
    //         }
    //         else{
    //             updatedprodata = [...prevstate.cartarray,{...prodata}]
    //         }
    //         //console.log(updatedprodata);
    //         return {prevstate,cartarray : updatedprodata}

    //     })
    
    // }

    // const Addtocart = (productdata)=>{
    //    // console.log(productdata)
    //     setstate((prevstate)=>{
    //         return{
    //             cartarray : [...prevstate.cartarray,productdata]
    //         }
    //     })
    // }

    const increase=(productdata)=>{
        console.log("inc")
        const existingproduct = state.cartarray.find((each)=>{
            return each.id ===productdata.id;
        })
        
        let updatedcartarray
        if(existingproduct){
            let quantityupdate = existingproduct.count
            updatedcartarray = state.cartarray.map((each)=>{
                if(each.id === existingproduct.id){
                    return {...each,count : quantityupdate +1}
                }
                return each
            })
            
        }
        else{
            updatedcartarray = [...state.cartarray,productdata]
        }
        //console.log(updatedcartarray)
        setstate((prevstate)=>{
            return{...prevstate,cartarray : updatedcartarray}

        })

    }

    const decrease=(productdata)=>{
        console.log("dec")
        const existingproduct = state.cartarray.find((each)=>{
            return each.id ===productdata.id;
        })
        let updatedcartarray
        if(existingproduct){
            let quantityupdate = existingproduct.count
            updatedcartarray = state.cartarray.map((each)=>{
                if(each.id === existingproduct.id){
                    return {...each,count : quantityupdate -1}
                }
                return each
            })
            
        }
        else{
            updatedcartarray = [...state.cartarray,productdata]
        }
        //console.log(updatedcartarray)
        setstate((prevstate)=>{
            return{...prevstate,cartarray : updatedcartarray}

        })

    }

    const removeproductfromcart = (idfromcart)=>{
        console.log(idfromcart)

        let updatedatedcartarray = state.cartarray.filter((each)=>{
            return each.id !== idfromcart
        })
        setstate((prevstate)=>{
            return {...prevstate,cartarray : updatedatedcartarray}
        })
            
        
    }

    const emptycart = ()=>{
        localStorage.clear()
        setstate((prevstate)=>{
            return{
                cartarray : []
            }
        })
    }

   
    return(
        <Cartcontext.Provider value={{
            cartarray : state.cartarray,
            //Addtocart : Addtocart,
            emptycart : emptycart,
            increase : increase,
            decrease : decrease,
            removeproductfromcart : removeproductfromcart
        }}>
            {children}
        </Cartcontext.Provider>
    )

}


export default Cartcontext