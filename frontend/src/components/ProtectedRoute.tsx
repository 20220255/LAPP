import {Navigate, Outlet} from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";


const ProtectedRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus()
    if (checkingStatus) {
        return <Spinner />
    }
    return loggedIn ? <Outlet /> : <Navigate to='/login' />
};

export default ProtectedRoute;