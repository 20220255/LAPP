import { useParams } from "react-router-dom"
import ControlledAccordionsUpdate from "../components/AccordionUpdate"


const TransactionMaintenance = () => {

    const { salesId } = useParams()

    return (
        <div>
          <h1>Customer Sales Update</h1>
          <ControlledAccordionsUpdate salesId={salesId} />
        </div>
      )
}

export default TransactionMaintenance
