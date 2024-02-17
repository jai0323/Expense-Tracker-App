import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpenseOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses(){

    const [isFetching,setIsFetching] = useState(true);
    const [error,setError] = useState();
    
    const expenseCtx = useContext(ExpensesContext);

    useEffect(() =>{
       async function getExpenses(){
         setIsFetching(true);
         try
         {
            const expenses = await  fetchExpense();
            expenseCtx.setExpenses(expenses);
         }
         catch(error){
            setError('Could not fetch expenses!');
         }
        
         setIsFetching(false);
        }

       getExpenses();
       
    }, []);

    
    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return  expense.date >= date7DaysAgo;
    });

 if(isFetching){
    return <LoadingOverlay />
 }

 function errorHandler(){
    setError(null);
    
 }

 if(error && !isFetching){
    return <ErrorOverlay  message={error} onConfirm={errorHandler}/>
 }

 return <ExpensesOutput expenses={recentExpenses} 
 expensePeriod="Last 7 days"
 fallbackText="No expense registered for the last 7 days."
 />
}

export default RecentExpenses;