import { Link, useNavigate } from "react-router-dom"
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { logout } from "../features/auth/authSlice"
import logoImage from '../asset/result_LasappImage175.png'
import { MouseEvent, useState } from "react"
import { Menu, MenuItem } from "@mui/material"
import { resetSales } from "../features/sales/salesSlice"
import { resetUsers } from "../features/users/userSlice"

const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const onLogout = () => {
        dispatch(resetSales())
        dispatch(logout())
        /** Resets the users state after logging out */
        dispatch(resetUsers())
    }

    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickHome = () => {
        setAnchorEl(null);
        navigate('/')

    }
    const handleClickTransactionList = () => {
        setAnchorEl(null);
        navigate('/transaction-list')
    }

    return (
        <header className="header">
            <div className="logo">
                <img src={logoImage} alt="logo" id="snapwashLogo" onClick={handleClick} />

                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={handleClickHome}>Home</MenuItem>
                    <MenuItem onClick={handleClickTransactionList}>Transaction List</MenuItem>
                </Menu>
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
