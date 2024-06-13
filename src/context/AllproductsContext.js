import { createContext,useEffect,useState } from "react";
import Cookies from "js-cookie";

const AllproductsContext = createContext({
    sortby :"",
    allproductsdata:[],
    sortbyfun :()=>{},
    clicksearch : ()=>{},
    searchfun :()=>{},
    getallproductsdata : ()=>{},
    categoryfunction : ()=>{},
    allproductsdataflag :true,
    clearfilter : ()=>{},
    clickrating : ()=>{}
    
})

const token = Cookies.get("jwt");


export const AllproductsProvider = ({children})=>{

    const [state,setstate]= useState({
        searchval : "",
        sortby :"",
        allproductsdata:[],
        filteredProducts:[],//this is the one
        allproductsdataflag :true,
        categoryval : "",
        rating : []
        
    })

    const clearfilter = ()=>{
        console.log("clear");
        setstate((prevstate)=>{
            return{...prevstate,filteredProducts : [...state.allproductsdata],categoryval : "", searchval : ""}
        })
    }

    const searchfun = (eventvalue) => {
        setstate((prevstate) => {
            return { ...prevstate, searchval: eventvalue};
        });
    };



//allproductsdata will remain same every time the filterproducts will upadte based on search input u need to create a new filteredarry in state
    const clicksearch= ()=>{
        setstate((prevstate)=>{
            const updateddata = state.allproductsdata.filter((each)=>{
                return each.title.toLowerCase().includes(prevstate.searchval.toLowerCase())
            })
            return{...prevstate,filteredProducts:updateddata}
        })
    }


    const sortbyfun = (eventvalue)=>{
        console.log(eventvalue);
        let sorttedarray;
        if(eventvalue === "low"){
            sorttedarray = state.filteredProducts.sort((a,b)=>{
                return a.price-b.price
            })
        }
        else if(eventvalue === "high"){
            sorttedarray = state.filteredProducts.sort((a,b)=>{
                return b.price-a.price
            })
        }
        else{
            sorttedarray = [...state.allproductsdata]
        }
        setstate((prevstate)=>{
            return{...prevstate,filteredProducts : sorttedarray,sortby : eventvalue}
        })

    }

    const categoryfunction = (eventvalue)=>{
        console.log(eventvalue)
        
        setstate((prevstate)=>{
            return {...prevstate,categoryval : eventvalue,sortby:"none"}
        })
        
        
    }
    

    useEffect(()=>{
        getallproductsdata()
    },[state.categoryval])

    const clickrating = (dataval)=>{
        console.log((dataval))
        const ratingarray = [...state.filteredProducts]
        const ratingdata = ratingarray.filter((each)=>{
           
            return parseInt(each.rating) >= parseInt(dataval)
        })

        setstate((prevstate)=>{
            return{...prevstate,filteredProducts : ratingdata}
        })
        // setstate((prevstate)=>{
        //     return{...prevstate,filteredProducts : ratingarray}
        // })

    }


    const getallproductsdata = async ()=>{
        
        let obj = {
            method : "GET",
            headers :
            {
                Authorization :`Bearer ${token}`
            }
        }
        const response = await fetch(`https://apis.ccbp.in/products?category=${state.categoryval}`, obj)
        if(response.ok){
            const responsedata = await response.json()
            console.log(responsedata);
            setstate((prevstate)=>{
                return{...prevstate,allproductsdata :responsedata.products,allproductsdataflag:true,filteredProducts:responsedata.products,rating:responsedata.products}
            })
        }
        
    }

    return(
        
        <AllproductsContext.Provider value={{
            allproductsdata:state.filteredProducts,
            getallproductsdata : getallproductsdata,
            allproductsdataflag : state.allproductsdataflag,
            searchfun : searchfun,
            clicksearch : clicksearch,
            categoryfunction : categoryfunction,
            sortbyfun : sortbyfun,
            sortby : state.sortby,
            clearfilter : clearfilter,
            clickrating : clickrating
        }}>
            {children}
        </AllproductsContext.Provider>
    )

}


export default AllproductsContext


