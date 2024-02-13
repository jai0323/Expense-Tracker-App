import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpenseOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

function RecentExpenses(){
    const expenseCtx = useContext(ExpensesContext);
    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return  expense.date >= date7DaysAgo;
    });
 return <ExpensesOutput expenses={recentExpenses} 
 expensePeriod="Last 7 days"
 fallbackText="No expense registered for the last 7 days."
 />
}

export default RecentExpenses;