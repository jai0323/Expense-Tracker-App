import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, textInputConfig, style }){
    let inputStyles = [styles.input];
    if(textInputConfig && textInputConfig.multiLine)
    {
        inputStyles.push(styles.inputMultiLine)
    }

    return <View style={[styles.inputContainer, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={inputStyles} {...textInputConfig} />
    </View>
}

export default Input;

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8
    },
    label:{
        fontSize:12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    input:{
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        fontSize: 16,
        borderRadius: 4,
        color: GlobalStyles.colors.primary700,        
    },
    inputMultiLine:{
        textAlignVertical: 'top',
        minHeight: 100,
    }
})