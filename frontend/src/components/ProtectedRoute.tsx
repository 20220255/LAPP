import {Navigate, Outlet} from "react-router-dom"
import { useAuthStatus } from "../hooks/useAuthStatus";
import Spinner from "./Spinner";


const ProtectedRoute = () => {
    const {loggedIn, checkingStatus, user} = useAuthStatus()
    if (checkingStatus) {
        return <Spinner />
    }
    return loggedIn && (JSON.stringify( user) !== '{}' || !user)  ? <Outlet /> : <Navigate to='/login' />
};

export default ProtectedRoute;