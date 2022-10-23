import {Outlet,Navigate} from "react-router-dom"
import {useSelector} from "react-redux"
const PrivateRoutes =({children}) =>{
    const currentUserid = useSelector((state)=>{return state.auth.currentUser.uid})
    console.log(currentUserid)
    return (
        currentUserid?<Outlet/>:<Navigate to="/login"/>
    )
    

}
export default PrivateRoutes;