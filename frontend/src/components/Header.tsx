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
import { NestedMenuItem } from 'mui-nested-menu'
import { resetExpense } from "../features/expenses/expenseSlice"
import { resetSupply } from "../features/supplies/supplySlice"
import { resetCashFund } from "../features/cashFund/cashFundSlice"

const Header = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const onLogout = () => {
        dispatch(resetSales())
        dispatch(resetExpense())
        dispatch(resetSupply())
        dispatch(resetCashFund())
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
    const handleClickExpenseList = () => {
        setAnchorEl(null);
        navigate('/expense-list')
    }

    const handleClickChart = () => {
        setAnchorEl(null);
        navigate('/chart')
    }

    const handleAddToCashFund = () => {
        setAnchorEl(null);
        navigate('/addCashFund')
    }

    const handleDeductFromCashFund = () => {
        setAnchorEl(null);
        navigate('/deductCashFund')
    }

    const handleViewCashFund = () => {
        setAnchorEl(null);
        navigate('/cashfund-list')
    }

    const handleSuppliesDetergent = () => {
        setAnchorEl(null);
        navigate('/supplies-detergent')
    }

    const handleSuppliesFabcon = () => {
        setAnchorEl(null);
        navigate('/supplies-fabcon')
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
                    <MenuItem onClick={handleClickExpenseList}>Expense List</MenuItem>
                    <MenuItem onClick={handleClickChart}>Chart</MenuItem>
                    <NestedMenuItem
                        label="Supplies"
                        parentMenuOpen={open}
                    >
                        <MenuItem onClick={handleSuppliesDetergent} >
                            Detergent
                        </MenuItem>
                        <MenuItem onClick={handleSuppliesFabcon}>
                            Fab Con
                        </MenuItem>

                    </NestedMenuItem>
                    <NestedMenuItem
                        label="Cash Fund"
                        parentMenuOpen={open}
                    >
                        <MenuItem onClick={handleAddToCashFund}>
                            Add Cash Fund
                        </MenuItem>
                        <MenuItem onClick={handleDeductFromCashFund} >
                            Deduct Cash Fund
                        </MenuItem>
                        <MenuItem onClick={handleViewCashFund} >
                            View Cash Fund Transactions
                        </MenuItem>
                    </NestedMenuItem>
                </Menu>
            </div>
            <ul>
                {!user || JSON.stringify(user) === '{}' ? (

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


                ) : (
                    <li>
                        <Link to='/' onClick={onLogout} > <FaSignOutAlt /> Logout </Link>
                    </li>

                )}

            </ul >
        </header >
    )
}

export default Header
