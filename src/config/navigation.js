import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../views/Login';
import SignUp from '../views/SignUp';
import Users from '../views/Users';
import RecentChats from '../views/RecentChats';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import {useSelector } from 'react-redux';
import Message from '../views/Message';



// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {
//     Dashboard,
//     Destination,
//     CarSelection,
//     YourTrips,
//     TripDetails,
//     Login,
//     SignUp,
//     Logout,
//     DriverSelection
//   } from '../views';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
  // const Drawer = createDrawerNavigator()
//   const Tab = createMaterialTopTabNavigator()


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function message() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello</Text>
    </View>
  );
}

export default function MainNavigator() {
  // const [user, setUser] = useState(false)
    
  const user = useSelector(state => state.userReducer.user)
    return (
      <NavigationContainer>
      {user ?
        <Tabs/>
        :
        <AuthStack />
      }
      </NavigationContainer>
    );
  }
  
  function AuthStack() {
    return <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  }

  function Tabs()
  {
    return <Tab.Navigator>
    <Tab.Screen name="Users" component={ChatScreens}/>
    <Tab.Screen name="Recent Chats" component={RecentChats}/>
  </Tab.Navigator>
  }

  function ChatScreens()
  {
      return (
      <Stack.Navigator>
        <Stack.Screen name="Chats" component={Users}/>
        <Stack.Screen name="message" component={Message}/>
      </Stack.Navigator>
    )
  }

  //  screenOptions={{ headerShown: false }}
 
  // function MainStack() {
  //   return <Drawer.Navigator initialRouteName="Dashboard">
  //     <Drawer.Screen name="Dashboard" component={DashboardStack} />
  //     <Drawer.Screen name="Your Trips" component={TripStack} />
  //     <Drawer.Screen name="Logout" component={Logout}/>
  //   </Drawer.Navigator>
  // }
  
 
  
  // function DashboardStack() {
  //   return (
  //     <Stack.Navigator screenOptions={{ headerShown: false }}>
  //       {/* <Stack.Screen name="Dashboard" component={WhatsappTabs} /> */}
  //       <Stack.Screen name="DashboardScreen" component={Dashboard} />
  //       <Stack.Screen name="Destination" component={Destination} />
  //       <Stack.Screen name="CarSelection" component={CarSelection} />
  //       <Stack.Screen name="DriverSelection" component={DriverSelection} />
  //     </Stack.Navigator>
  //   )
  // }
  
  // function TripStack() {
  //   return (
  //     <Stack.Navigator screenOptions={{ headerShown: false }}>
  //       <Stack.Screen name="YourTrips" component={YourTrips} />
  //       <Stack.Screen name="TripDetails" component={TripDetails} />
  //     </Stack.Navigator>
  //   )
  // }
  
  
  /*
    1. Stack Navigator
    2.
  
  */