import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getForMattedDate } from "../../util/date";
import { Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValue}){

    const [inputs, setInputs] = useState({
        amount: { 
            value: defaultValue ? defaultValue.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValue ? getForMattedDate( defaultValue.date) : '',
            isValid: true,
        },
        description:{
            value:  defaultValue ? defaultValue.description: '',
            isValid: true,
        }
    });
    
    function inputChangeHandler(inputIdentifier, enteredValue){
       setInputs((curInputs) => {
        return{
            ...curInputs,
            [inputIdentifier]: { value: enteredValue, isValid: true},
        }
       });
    }

    function sumbitHandler(){
        const expenseData = {
            amount: +inputs.amount.value,
            date:new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
           // Alert.alert('Invalid Values!', 'Please check your input value.')
           setInputs((curInputs)=>{
            return{
                amount: { value: curInputs.amount.value,isValid: amountIsValid },
                date: { value: curInputs.date.value,isValid: dateIsValid },
                description: { value: curInputs.description.value,isValid: descriptionIsValid },
            }
           })
           return;
        }
        else
        onSubmit(expenseData);
    }


    const formIsValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input label="Amount"
            style={styles.rowInput}
            invalid={!inputs.amount.isValid}
            textInputConfig={
            {
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this,'amount'),
                value: inputs.amount.value
            }
            
            }/>
            <Input label="Date" 
            style={styles.rowInput}
            invalid={!inputs.date.isValid}
            textInputConfig={
            {
                placeholder: 'YYYY-MM-DD',
                maxLength: 10,
                keyboardType: 'decimal-pad',
                onChangeText: inputChangeHandler.bind(this, 'date'),
                value: inputs.date.value
            }
            }/>
        </View>

        <Input label="Description"
         invalid={!inputs.description.isValid}
        textInputConfig={
        {
            keyboardType: 'default',
            multiLine: true,
            onChangeText: inputChangeHandler.bind(this, 'description'),
            value: inputs.description.value
        }
        }
        />
        { formIsValid && <Text style={styles.errortext}>Please check your input value. </Text>}

        <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
            Cancel
        </Button>
        <Button onPress={sumbitHandler} style={styles.button}>
            {submitButtonLabel}
        </Button>
    </View>
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
    },
    errortext:{
        textAlign: 'left',
        color: GlobalStyles.colors.error500,
        marginTop: 8,
        marginBottom:20
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

})