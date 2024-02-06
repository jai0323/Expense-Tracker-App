import { FlatList, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const DUMMY_EXPENSES = [
    {
        id:'e1',
        description: 'a pair of shoes',
        amount: 59.99,
        date: new Date('2021-01-12')
    },
    {
        id:'e2',
        description: 'a pair of trousers',
        amount: 549.99,
        date: new Date('2022-01-22')
    },
    {
        id:'e3',
        description: 'some bananas',
        amount: 9.99,
        date: new Date('2022-01-05')
    },
    {
        id:'e4',
        description: 'Books',
        amount: 14.99,
        date: new Date('2021-02-19')
    },
    {
        id:'e5',
        description: 'Another book',
        amount: 18.99,
        date: new Date('2022-02-18')
    },
];

function ExpensesOutput ({expenses, expensePeriod}){
 return <View>
    <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensePeriod}/>
    <ExpensesList expenses={DUMMY_EXPENSES} />
 </View>
}

export default ExpensesOutput;
