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

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverView(){
  return (
  <BottomTabs.Navigator screenOptions={{
    headerStyle:{ backgroundColor: GlobalStyles.colors.primary500},
    headerTintColor: 'white',
    tabBarStyle:{ backgroundColor: GlobalStyles.colors.primary500},
    tabBarActiveTintColor: GlobalStyles.colors.accent500,
  }}>
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
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="ExpensesOverView" component={ExpenseOverView} 
          options={{headerShown:false}}
          
          />
          <Stack.Screen name="ManageExpense" component={ManageExpense} 
          
          />
        </Stack.Navigator>
      </NavigationContainer>
   </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
