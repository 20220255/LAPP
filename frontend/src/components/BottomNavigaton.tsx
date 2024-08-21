import { BottomNavigation, BottomNavigationAction, Paper, } from "@mui/material";
import { BiSolidWasher } from "react-icons/bi";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { MdPayments } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BottomNavigationActionStyled } from "./BottomNavigator.style";
// review syled components especially when importing exisitng component from a module

const BottomNavigaton = () => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/transaction')
    }


    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5}>
            <BottomNavigation
                showLabels
            >
                <BottomNavigationActionStyled label="Sales" icon={<FaRegMoneyBillAlt />} />
                <BottomNavigationActionStyled onClick={handleClick} label="Transaction" icon={<BiSolidWasher />} />
                <BottomNavigationActionStyled sx={{ color: 'red' }} label="Expense" icon={<MdPayments />} />
                <BottomNavigationActionStyled label="My Folds" icon={<GiClothes />} />
            </BottomNavigation>
        </Paper>
    )
}

export default BottomNavigaton
