import { useParams } from "react-router-dom"
import { SalesAccordionsMaintenance } from "../components/SalesAccordionMaintenance"

const TransactionMaintenance = () => {

    const { salesId } = useParams()

    return (
        <div>
            <h1>Customer Sales Update</h1>
            <SalesAccordionsMaintenance salesId={salesId} />
        </div>
    )
}

export default TransactionMaintenance