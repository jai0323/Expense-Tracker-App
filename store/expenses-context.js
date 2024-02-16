import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses:[],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id,{description, amount, date}) => {},
});

// both value will be provided by react (state and action) 

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            return [action.payload, ...state]

        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;

        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updatableExpense = state[updatableExpenseIndex];
            const updateItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] =  updateItem;
            return updatedExpenses;

        case 'DELETE':
                return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expensesReducer,[]);
    
     function addExpense(expenseData){
        // first argument is action
        dispatch({type: 'ADD', payload: expenseData});
     }

     function setExpenses(expenses){
        dispatch({ type: 'SET', payload: expenses})
     }

     function deleteExpense(id){
        // first argument is action
        dispatch({type: 'DELETE', payload: id});
     }

     function updateExpense(id, expenseData){
        // first argument is action
        dispatch({type: 'UPDATE', payload: { id: id, data: expenseData}});
     }

     const value = {
        expenses: expensesState,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
     }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;