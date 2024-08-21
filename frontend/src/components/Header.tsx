import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { logout, reset } from "../features/auth/authSlice"

const Header = () => {
    const dispatch = useDispatch()

    const { user } = useSelector((state: RootState) => state.auth)

    const onLogout = () => {
        dispatch(reset())
        dispatch(logout())
        
    }
    return (
        <header className="header">
            <div className="logo">
                <Link to='/'>Home</Link>
            </div>
            <ul>
                {user ? (<li>
                    <Link to='/' onClick={onLogout} > <FaSignOutAlt /> Logout </Link>
                </li>) : (
                    <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Login
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Register
                            </Link>
                        </li>
                    </>
                )}

            </ul >
        </header >
    )
}

export default Header
