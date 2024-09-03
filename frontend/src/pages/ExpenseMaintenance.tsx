import { useParams } from "react-router-dom"
import { ExpenseAccordionsMaintenance } from "../components/ExpenseAccordionMaintenance"

const ExpenseMaintenance = () => {

    const { expenseId } = useParams()

    return (
        <div>
            <h1>Expense Update</h1>
            <ExpenseAccordionsMaintenance expenseId={expenseId} />
        </div>
    )
}

export default ExpenseMaintenance