import "./index.css";
import AllproductsContext from "../../context/AllproductsContext";
import { useContext } from "react";


const ProductsHeader = ()=>{
    const contextdata = useContext(AllproductsContext);
    const {searchval,sortby,searchfun,sortbyfun,clicksearch} =contextdata

    const onsearchfun =(event)=>{
        searchfun(event.target.value);
    }

    const onclicksearchfun =()=>{
        clicksearch()
    }

    const onsortby=(event)=>{
        sortbyfun(event.target.value)
    }

    return(
        <div className = "products-header-back">
            <input type = "search"  placeholder="search" className = "search-bar" onChange={onsearchfun}/>
            <button onClick={onclicksearchfun}>search</button>
            <h1 className = "products-header-heading">All Products</h1>
            <div className= "drop-down">
                <label htmlFor="dropdown" className = "drop-down-label">
                    SortBy: 
                </label>
                <select  id="dropdown" onChange={onsortby} value={sortby}>
                    <option></option>
                    <option value = "high">High to Low</option>
                    <option value = "low">Low to high</option>
                </select>
            </div>
            
        </div>
    )
}


export default ProductsHeader