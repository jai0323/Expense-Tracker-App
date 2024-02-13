import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpenseOutput";
import { ExpensesContext } from "../store/expenses-context";

function AllExpenses(){
const expenseCtx = useContext(ExpensesContext);
 return <ExpensesOutput expenses={expenseCtx.expenses} expensePeriod="Total"
 fallbackText="No registered expense found!"
 />
}

export default AllExpenses;