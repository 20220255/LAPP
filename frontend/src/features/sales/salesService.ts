import axios from 'axios'
import { SalesType } from './salesSlice'

const API_URL = '/api/sales'

// input sales
const inputSales = async(salesData: SalesType) => {
    const response = await axios.post(API_URL, salesData)
    console.log('response data - ', response.data)
    return await response.data

}

const salesService = {
    inputSales,
}

export default salesService