import axios from 'axios'
import { SalesType } from './salesSlice'

const API_URL = '/api/sales'

// input sales
const inputSales = async(salesData: SalesType) => {
    const response = await axios.post(API_URL, salesData)
    return await response.data
}

// update sales
const updateSales = async(salesData: SalesType) => {
    const repsonse = await axios.put(API_URL + '/update', salesData)
    return await repsonse.data

}

// get sales list
const getSalesList = async() => {
    const response = await axios.get(API_URL)
    return await response.data
}

const salesService = {
    inputSales, getSalesList, updateSales
}

export default salesService