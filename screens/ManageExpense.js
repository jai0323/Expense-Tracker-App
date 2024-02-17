import { useContext, useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpenses, storeExpense, updateExpenses } from '../util/http';
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({route, navigation}){

    const [error,setError] = useState();
    const [upadateLoading,setUpadateLoading] = useState(false);
    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;
    const expenseCtx = useContext(ExpensesContext);

    const selectedExpense = expenseCtx.expenses.find(
        (expense) => expense.id === editedExpenseId
    );

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense' 
        })
    },[navigation,isEditing]);


    async function deleteExpenseHandler(){
        setUpadateLoading(true);
        try{
            await deleteExpenses(editedExpenseId);
            expenseCtx.deleteExpense(editedExpenseId);
            navigation.goBack();
        }
        catch(error){
            setError("Could not delete expense - please try again later!")
            setUpadateLoading(false);
        }
    }

    function cancelHandler(){

        navigation.goBack();
    }

    async function confirmHandler(expenseData){
        setUpadateLoading(true);
        try{
            if(isEditing)
            {
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpenses(editedExpenseId, expenseData); 
            }
            else{
                //Api firebase
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id : id});
            }
            navigation.goBack();
        }
        catch(error){
            setError("Could not save data - please try again later!")
            setUpadateLoading(false);
        }
    }


    if(error && !upadateLoading){
        return <ErrorOverlay  message={error}/>
     }

    if(upadateLoading)
    return <LoadingOverlay />

 return <View style={styles.container}>
    <ExpenseForm 
        onCancel={cancelHandler} 
        submitButtonLabel={isEditing ? 'Upadte' : 'Add'}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
    />
    
    {isEditing && 
    <View style={styles.deleteContainer}>
        <IconButton icon="trash" 
        color={GlobalStyles.colors.error500} 
        size={36}
        onPress={deleteExpenseHandler}
        />
    </View>
    }
 </View>
}

export default ManageExpense;

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
})