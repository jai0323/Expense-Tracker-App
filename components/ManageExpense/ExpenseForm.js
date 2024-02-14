import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";

function ExpenseForm(){

    const [inputValue, setInputValue] = useState({
        amount: '',
        date: '',
        description: ''
    });
    
    function inputChangeHandler(inputIdentifier, enteredValue){
       setInputValue((curInputValues) => {
        return{
            ...curInputValues,
            [inputIdentifier]: enteredValue
        }
       });
    }

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input label="Amount"
            style={styles.rowInput}
            textInputConfig={
            {
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this,'amount'),
                value: inputValue['amount']
            }
            
            }/>
            <Input label="Date" 
            style={styles.rowInput}
            textInputConfig={
            {
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputValue.date
            }
            }/>
        </View>

        <Input label="Description" textInputConfig={
        {
            keyboardType: 'default',
            multiLine: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputValue.description
        }
        }/>
    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop:40
    },
    title:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: "center",
    },
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    rowInput:{
        flex:1
    }
})