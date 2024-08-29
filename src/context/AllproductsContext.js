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
    clickrating : ()=>{},
    failimage : ""
    
})

const token = Cookies.get("jwt");


// export const AllproductsProvider = ({children})=>{

//     const [state,setstate]= useState({
//         searchval : "",
//         sortby :"",
//         allproductsdata:[],
//         filteredProducts:[],//this is the one
//         allproductsdataflag :true,
//         categoryval : "",
//         rating : [],ratingval:0,
//         displaydata :[]
//     })

//     const clearfilter = ()=>{
//         console.log("clear");
//         setstate((prevstate)=>{
//             return{...prevstate,filteredProducts : [...state.allproductsdata],categoryval : "", searchval : ""}
//         })
//     }

//     const searchfun = (eventvalue) => {
//         setstate((prevstate) => {
//             return { ...prevstate, searchval: eventvalue};
//         });
//     };



// //allproductsdata will remain same every time the filterproducts will upadte based on search input u need to create a new filteredarry in state
//     const clicksearch= ()=>{
//         // filterbayall()
//         setstate((prevstate)=>{
//             const updateddata = state.allproductsdata.filter((each)=>{
//                 return each.title.toLowerCase().includes(prevstate.searchval.toLowerCase())
//             })
//             return{...prevstate,filteredProducts:updateddata}
//         })
//     }


//     const sortbyfun = (eventvalue)=>{
//         // filterbayall()
   
//         let sorttedarray;
//         if(eventvalue === "low"){
//             sorttedarray = state.filteredProducts.sort((a,b)=>{
//                 return a.price-b.price
//             })
//         }
//         else if(eventvalue === "high"){
//             sorttedarray = state.filteredProducts.sort((a,b)=>{
//                 return b.price-a.price
//             })
//         }
//         else{
//             sorttedarray = [...state.allproductsdata]
//         }
//         setstate((prevstate)=>{
//             return{...prevstate,filteredProducts : sorttedarray,sortby : eventvalue}
//         })

//     }

//     const categoryfunction = (eventvalue)=>{
        
//         setstate((prevstate)=>{
//             return {...prevstate,categoryval : eventvalue,sortby:"none"}
//         })
        
        
//     }
    

//     useEffect(()=>{
//         getallproductsdata()
//     },[state.categoryval])




//     const clickrating = (dataval)=>{
//         // filterbayall()
//         const ratingdata = state.rating.filter((each)=>{
//             return parseInt(each.rating) >= parseInt(dataval)
//         })

//         setstate((prevstate)=>{
//             return{...prevstate,filteredProducts : ratingdata,ratingval : parseInt(dataval)}
//         })
        
       
//         // setstate((prevstate)=>{
//         //     return{...prevstate,filteredProducts : ratingarray}
//         // })

//     }


//     const getallproductsdata = async ()=>{
        
//         let obj = {
//             method : "GET",
//             headers :
//             {
//                 Authorization :`Bearer ${token}`
//             }
//         }
//         const response = await fetch(`https://apis.ccbp.in/products?category=${state.categoryval}`, obj)
//         if(response.ok){
//             const responsedata = await response.json()
//             setstate((prevstate)=>{
//                 return{...prevstate,allproductsdata :responsedata.products,allproductsdataflag:true,filteredProducts:responsedata.products,rating:responsedata.products,displaydata:responsedata.products}
//             })
//         }
        
//     }

//     return(
        
//         <AllproductsContext.Provider value={{
//             allproductsdata:state.filteredProducts,
//             getallproductsdata : getallproductsdata,
//             allproductsdataflag : state.allproductsdataflag,
//             searchfun : searchfun,
//             clicksearch : clicksearch,
//             categoryfunction : categoryfunction,
//             sortbyfun : sortbyfun,
//             sortby : state.sortby,
//             clearfilter : clearfilter,
//             clickrating : clickrating
//         }}>
//             {children}
//         </AllproductsContext.Provider>
//     )

// }


export const AllproductsProvider = ({ children }) => {
    const [state, setState] = useState({
        searchval: "",
        sortby: "",
        allproductsdata: [],
        filteredProducts: [],
        allproductsdataflag: true,
        categoryval: "",
        ratingval: 0,
        clearfilterdata : []
    });

    const filterbayall = () => {
        
        let finaldata = state.allproductsdata;

        if (state.searchval !== "") {
            finaldata = finaldata.filter((each) => {
                return each.title.toLowerCase().includes(state.searchval.toLowerCase());
            });
        }

        if (state.sortby === "low") {
            finaldata = finaldata.sort((a, b) => a.price - b.price);
        } else if (state.sortby === "high") {
            finaldata = finaldata.sort((a, b) => b.price - a.price);
        }

        if (state.ratingval !== 0) {
            finaldata = finaldata.filter((each) => {
                return parseInt(each.rating) >= parseInt(state.ratingval);
            });
        }

        if(finaldata.length ===0){
            setState((prevstate)=>{
                return {...prevstate,allproductsdataflag : false};
            })
        }
        
        setState((prevState) => {
            return { ...prevState, filteredProducts: finaldata };
        });
       
    };

    useEffect(() => {
        filterbayall();
    }, [ state.sortby, state.ratingval,state.categoryval]);

    const clearfilter = () => {
       
        setState((prevState) => {
            return { 
                ...prevState, 
                searchval: "", 
                sortby: "", 
                ratingval: 0, 
                categoryval: "",
                failimage : ""
                //filteredProducts: prevState.clearfilterdata
            };
        });
        console.log(state.clearfilterdata)
    };
    const searchfun = (eventvalue) => {
        setState((prevState) => {
            return { ...prevState, searchval: eventvalue };
        });
    };

    const clicksearch = () => {
        filterbayall();
    };

    const sortbyfun = (eventvalue) => {
        setState((prevState) => {
            return { ...prevState, sortby: eventvalue };
        });
    };

    const categoryfunction = (eventvalue) => {
        setState((prevState) => {
            return { ...prevState, categoryval: eventvalue };
        });
    };

    useEffect(() => {
        getallproductsdata();
    }, [state.categoryval]);

    const clickrating = (dataval) => {
        setState((prevState) => {
            return { ...prevState, ratingval: dataval };
        });
    };

    const getallproductsdata = async () => {
        let obj = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const response = await fetch(`https://apis.ccbp.in/products?category=${state.categoryval}`, obj);
        if (response.ok) {
            const responsedata = await response.json();
            setState((prevState) => {
                return {
                    ...prevState,
                    clearfilterdata  : responsedata.products,
                    allproductsdata: responsedata.products,
                    allproductsdataflag: true,
                    filteredProducts: responsedata.products,
                    
                };
            });
        }
        else{
            setState((prevstate)=>{
                return{...prevstate,failimage : "https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"}
            })
        }
    };

    return (
        <AllproductsContext.Provider value={{
            allproductsdata: state.filteredProducts,
            getallproductsdata: getallproductsdata,
            allproductsdataflag: state.allproductsdataflag,
            searchfun: searchfun,
            clicksearch: clicksearch,
            categoryfunction: categoryfunction,
            sortbyfun: sortbyfun,
            sortby: state.sortby,
            clearfilter: clearfilter,
            clickrating: clickrating,
            failimage : state.failimage
        }}>
            {children}
        </AllproductsContext.Provider>
    );
};


export default AllproductsContext


