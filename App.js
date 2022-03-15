import * as React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import RecentScreen from './screens/RecentScreen';
import DashboardScreen from './screens/DashboardScreen';
import RecordForm from './screens/RecordForm';
import LocationScreen from './screens/LocationScreen';
import AccountScreen from './screens/AccountScreen';
import LoginScreen from './screens/LoginScreen';
import OpenModal from './screens/OpenModal';
import DetailScreen from './screens/DetailScreen';
import Touch from './screens/Touch';

import Tabs from './navigations/Tabs';

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

import { ThisMonth, LastMonth, NextMonth } from './screens/RecentScreen';
import SignIn from './screens/SignIn';

const Stack = createStackNavigator();

// function AccountStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="AccountHome"
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: '#0096DA',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}>
//       <Stack.Screen
//         name="AccountHome"
//         component={AccountScreen}
//         // options={{title: 'Account'}}
//       />
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         // options={{title: 'Login'}}
//       />
//     </Stack.Navigator>
//   );
// }

// function HomeStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Home"
//       screenOptions={{
//         headerShown: false,
//     }}>
//       <Stack.Screen
//         name="Recent_St"
//         component={RecentScreen}
//         // options={{title: 'RecentScreen'}}
//       />
//       <Stack.Screen
//         name="RecordForm"
//         component={RecordForm}
//         // options={{title: 'RecordForm'}}
//       />
//       <Stack.Screen
//         name="Detail"
//         component={DetailScreen}
//       />
//       {/* <Stack.Screen
//         name="SignIn"
//         component={SignIn}
//       /> */}
//     </Stack.Navigator>
//   );
// }

// function DashboardStack() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Dashboard!</Text>
//     </View>
//   );
// }

// const TopTab = createMaterialTopTabNavigator();

function RecentTabs() {
  return (
    <TopTab.Navigator
      initialRouteName = 'This Month'
    >
      <TopTab.Screen name="Last Month" component={LastMonth} />
      <TopTab.Screen name="This Month" component={ThisMonth} />
      <TopTab.Screen name="Next Month" component={NextMonth} />
    </TopTab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        initialRouteName={"Home"}
      >
        <Stack.Screen name="Signin" component={SignIn} />
        <Stack.Screen name="Main" component={Tabs} />
        <Stack.Screen name="Recent" component={RecentScreen} />
        <Stack.Screen name="RecordForm" component={RecordForm} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Account" component={AccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}