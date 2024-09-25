import axios from "axios"
import getUserAuth from "../../utils/getUserAuth"
import { SupplyType } from "./supplyTypes"


const API_URL = '/api/supply'

/** Add supplies */
const addSupplies = async(addSupplyData: SupplyType) => {
    /** user used for back end authorization */
    const user = await getUserAuth()
    const response = await axios.post(API_URL + '/add', addSupplyData, {
        headers: {Authorization: `Bearer ${user.token}`}
    })
    return await response.data
}

const deductSupplies = async(deductSupplyData: SupplyType) => {
    const user = await getUserAuth()
    const response = await axios.post(API_URL + '/deduct', deductSupplyData, {
        headers: {Authorization: `Bearer ${user.token}`}
    })
    return await response.data
}

const getAllSupplies = async(): Promise<SupplyType[]> => {
    const user = await getUserAuth()
    const response = await axios.get(API_URL + '/getAllSupplies', {
        headers: {Authorization: `Bearer ${user.token}`}
    })
    return await response.data
}


const supplyService = {
    addSupplies,  getAllSupplies, deductSupplies //getLast20Supplies,
}

export default supplyService



