import { useParams } from "react-router-dom"
import { ControlledAccordionsMaintenance } from "../components/SalesAccordionMaintenance"

const TransactionMaintenance = () => {

    const { salesId } = useParams()

    return (
        <div>
            <h1>Customer Sales Update</h1>
            <ControlledAccordionsMaintenance salesId={salesId} />
        </div>
    )
}

export default TransactionMaintenance