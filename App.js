import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverView(){
  return (
  <BottomTabs.Navigator screenOptions={({navigation})=> ({
    headerStyle:{ backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle:{ backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
    headerRight: ({tintColor}) => {
      return <IconButton icon="add" size={24} color={tintColor} 
      onPress={()=>{ navigation.navigate('ManageExpense');
      console.log("navigate")
    }}/>
    },
 })}>
    <BottomTabs.Screen name="RecentScreen" component={RecentExpenses}
      options={{
        title: 'Recent Expenses',
        tabBarLabel:'Recent',
        tabBarIcon:({color, size}) => {
           return <Ionicons name="hourglass" size={size} color={color}/>
        },
      }}
    />
    <BottomTabs.Screen name="AllScreen" component={AllExpenses} 
     options={{
      title: 'All Expenses',
      tabBarLabel:'All Expenses',
      tabBarIcon:({color, size}) => {
       return <Ionicons name="calendar" size={size} color={color}/>
      },
    }}
    />
  </BottomTabs.Navigator>
  );
}


export default function App() {

  return (
   <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle:{ backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
        }}>
          <Stack.Screen name="ExpensesOverView" component={ExpenseOverView} 
          options={{headerShown:false}}
          
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} 
             options={{
              presentation: 'modal'
             }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ExpensesContextProvider>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
