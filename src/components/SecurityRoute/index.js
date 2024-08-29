import Cookies from "js-cookie"
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const SecurityRoute = ()=>{
    const token = Cookies.get("jwt");
    if(token !== undefined ){
        return <Outlet/>
      
    }
    else{
        return <Navigate to ="/login"/>
    }
    

}

export default SecurityRoute






// const ProtectedRoute = ()=>{
//     const token = Cookies.get("jwt-token");
//     if(token === undefined)
//     {
//         return <Navigate to ="/login" />

//     }
//     return <Outlet/> // this is like empyt box which is used for routes children  so if the token is there then it will go routes children and matches the route and wraps in the empty box 

// }
// export default ProtectedRoute