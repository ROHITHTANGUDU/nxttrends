import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import SecurityRoute from "./components/SecurityRoute";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Products from "./components/Products";
import Cart from "./components/Cart";
import NotFound from "./components/NotFound";
import { AllproductsProvider } from "./context/AllproductsContext";


const App  = ()=>{
  return(
    <BrowserRouter>
      <AllproductsProvider>
        <Routes>
          <Route excat path = "/login" element ={<Login/>}/>  
          <Route element={<SecurityRoute/>}>
            <Route excat path = "/home" element ={<Home/>}/> 
            <Route excat path = "/products" element ={<Products/>}/>  
            <Route excat path = "/cart" element ={<Cart/>}/>  
          </Route>
          <Route path = "/*" element={<NotFound/>}/>
        </Routes>
      </AllproductsProvider>
    </BrowserRouter>
  
  )
}


export default App