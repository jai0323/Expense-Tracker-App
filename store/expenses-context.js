import { createContext, useReducer } from "react";


const DUMMY_EXPENSES = [
    {
        id:'e1',
        description: 'a pair of shoes',
        amount: 59.99,
        date: new Date('2024-02-12')
    },
    {
        id:'e2',
        description: 'a pair of trousers',
        amount: 549.99,
        date: new Date('2024-02-10')
    },
    {
        id:'e3',
        description: 'some bananas',
        amount: 9.99,
        date: new Date('2024-02-13')
    },
    {
        id:'e4',
        description: 'Books',
        amount: 14.99,
        date: new Date('2024-01-29')
    },
    {
        id:'e5',
        description: 'Another book',
        amount: 18.99,
        date: new Date('2022-02-18')
    },
    {
        id:'e6',
        description: 'a pair of shoes',
        amount: 59.99,
        date: new Date('2021-01-12')
    },
    {
        id:'e7',
        description: 'a pair of trousers',
        amount: 549.99,
        date: new Date('2022-01-22')
    },
    {
        id:'e8',
        description: 'some bananas',
        amount: 9.99,
        date: new Date('2022-01-05')
    },
    {
        id:'e9',
        description: 'Books',
        amount: 14.99,
        date: new Date('2021-02-19')
    },
    {
        id:'e10',
        description: 'Another book',
        amount: 18.99,
        date: new Date('2022-02-18')
    },
];

export const ExpensesContext = createContext({
    expenses:[],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id,{description, amount, date}) => {},
});

// both value will be provided by react (state and action) 

function expensesReducer(state, action){
    switch(action.type){
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id:id}, ...state]
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
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
    
     function addExpense(expenseData){
        // first argument is action
        dispatch({type: 'ADD', payload: expenseData});
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
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
     }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;