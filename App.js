import * as React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from 'react-native';

import RecentScreen from './screens/RecentScreen';
import DashboardScreen from './screens/DashboardScreen';
import RecordForm from './screens/RecordForm';
import LocationScreen from './screens/LocationScreen';
import AccountScreen from './screens/AccountScreen';
import DetailScreen from './screens/DetailScreen';
import Tabs from './navigations/Tabs';
import SignIn from './screens/SignIn';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "EventEmitter.removeListener('keyboardDidShow', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`",
  "EventEmitter.removeListener('change', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`",
  "EventEmitter.removeListener('keyboardDidHide', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`",
  "Warning:",
]);

// import { ThisMonth, LastMonth, NextMonth } from './screens/RecentScreen';


const Stack = createStackNavigator();

// function RecentTabs() {
//   return (
//     <TopTab.Navigator
//       initialRouteName = 'This Month'
//     >
//       <TopTab.Screen name="Last Month" component={LastMonth} />
//       <TopTab.Screen name="This Month" component={ThisMonth} />
//       <TopTab.Screen name="Next Month" component={NextMonth} />
//     </TopTab.Navigator>
//   );
// }

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