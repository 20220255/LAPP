import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {

    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const {user} = useSelector((state) => state.auth)

    useEffect(() => {
        if (user) {
            setLoggedIn(true)    
        } else {
            setLoggedIn(false)
        }
        setCheckingStatus(false)
    },[user])

    /** Added user information to be retrieved from the hook */
    return {loggedIn, checkingStatus, user}
}





