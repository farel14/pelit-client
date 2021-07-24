import React from "react";
// import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";
import store from "./store";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
// import Home from './screens/Home.jsx'
import AddExpense from "./screens/AddExpense.jsx";
import EditExpense from "./screens/EditExpense";
// import EditExpense from './screens/EditExpense.jsx'
// import MyProfile from './screens/MyProfile.jsx'
// import ExpenseReport from './screens/MyProfile.jsx'
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <View style={styles.container}>
        <Text>asdasdasdadas</Text> */}
        <Stack.Navigator initialRouteName="EditExpense">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
          <Stack.Screen name="EditExpense" component={EditExpense} />
        </Stack.Navigator>
        {/* </View> */}
      </NavigationContainer>
    </Provider>
  );
}

//   {/* LOGIN & REGISTER */}
//   {/* <Stack.Screen name="Login" component={Login}/>
// <Stack.Screen name="Register" component={Register}/> */}

//   {/* SUMMARY PAGE */}
//   {/* <Stack.Screen name="Home" component={Home}/> */}

//   {/* EDIT EXPENSE */}
//   {/* <Stack.Screen name="EditExpense" component={EditExpense} /> */}

//   {/* PROFILE & ANALYTICS EXPENSE */}
//   {/* <Stack.Screen name="MyProfile" component={MyProfile}/>
// <Stack.Screen name="ExpenseReport" component={ExpenseReport}/> */}

// <StatusBar style="auto" />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
