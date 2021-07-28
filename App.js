import React, {useState} from "react";
// import { StatusBar } from 'expo-status-bar';
import { Provider } from "react-redux";
import store from "./store";
import Login from "./screens/Login.jsx";
import Register from "./screens/Register.jsx";
import Home from "./screens/Home.jsx";
import AddExpense from "./screens/AddExpense.jsx";
import EditExpense from "./screens/EditExpense";
import Dashboard from "./screens/Dashboard.jsx";
import MyProfile from "./screens/MyProfile.jsx";
import SideMenu from "./components/SideMenu.jsx";
import ExpenseReport from "./screens/ExpenseReport.jsx";
import { StyleSheet, Text, View, Button, Image} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddRecord from "./screens/AddRecord";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Drawer from 'react-native-drawer'
import { Icon, Overlay } from 'react-native-elements'

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, flex:0.2},
  main: {paddingLeft: 0},
}

export default function App() {
  const Stack = createStackNavigator();
  const [drawer, setDrawer] = useState(false)
  // closeControlPanel = () => {
  //   this._drawer.close()
  // };
  // openControlPanel = () => {
  //   this._drawer.open()
  // };

  function toggleDrawer() {
    setDrawer(!drawer)
  }

  console.log(drawer)

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerStyle: {
          backgroundColor: 'beige'}, headerTitleAlign: 'center', headerTitleStyle: {
            color: 'black',
          },
          headerLeft: () => (
            // <Text style={{marginLeft: 2}}>a</Text>
            <View style={{marginLeft: 5}}>
              <Icon
            name='menu' style={{marginLeft: 15}} onPress={toggleDrawer}/>
            </View>
          ),
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} options={{ title: 'Home'}} />
          <Stack.Screen name="Add Expense" component={AddExpense} />
          <Stack.Screen name="Edit Expense" component={EditExpense} />
          <Stack.Screen name="My Profile" component={MyProfile} />
          <Stack.Screen name="My Dashboard" component={Dashboard} />
          <Stack.Screen name="Add Record" component={AddRecord} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* {
        drawer ?
        <View style={{zIndex: 5, flex: 1}}>
          <Text>Hello from Overlay!</Text>
          <Drawer
            style={{flex:1}}
            open={drawer}
            type="overlay"
            content={<SideMenu />}
            tapToClose={true}
            openDrawerOffset={0.2} // 20% gap on the right side of drawer
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={drawerStyles}
            tweenHandler={(ratio) => ({
              main: { opacity:(2-ratio)/2 }
            })}
            >
            </Drawer>
        </View>
        <Overlay isVisible={drawer} onPress={toggleDrawer}>
         </Overlay>
      :
      null
      } */}
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
