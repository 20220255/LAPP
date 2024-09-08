import axios from "axios"
import getUserAuth from "../../utils/getUserAuth"
import { CashFundType }  from "./cashFundSlice"



const API_URL = '/api/cashFund'

const addCashFund = async(addCashData: CashFundType) => {
    const user = await getUserAuth()
    const response = await axios.post(API_URL + '/add', addCashData, {
        headers: {Authorization: `Bearer ${user.token}`}
    })
    return await response.data
}

const getLastCF = async() => {
    const user = await getUserAuth()
    const response = await axios.get(API_URL + '/getLastCF', {
        headers: {Authorization: `Bearer ${user.token}`}
    })
    return await response.data
}


const cashFundService = {
    addCashFund, getLastCF
}

export default cashFundService



