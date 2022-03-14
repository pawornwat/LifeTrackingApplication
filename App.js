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

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

import { ThisMonth, LastMonth, NextMonth } from './screens/RecentScreen';

const Stack = createStackNavigator();

function AccountStack() {
  return (
    <Stack.Navigator
      initialRouteName="AccountHome"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#0096DA',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="AccountHome"
        component={AccountScreen}
        // options={{title: 'Account'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        // options={{title: 'Login'}}
      />
    </Stack.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Recent"
      screenOptions={{
        headerShown: false,
    }}>
      <Stack.Screen
        name="Recent_St"
        component={RecentScreen}
        // options={{title: 'RecentScreen'}}
      />
      <Stack.Screen
        name="RecordForm"
        component={RecordForm}
        // options={{title: 'RecordForm'}}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        // options={{title: 'RecordForm'}}
      />
    </Stack.Navigator>
  );
}

function DashboardStack() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Dashboard!</Text>
    </View>
  );
}

const TopTab = createMaterialTopTabNavigator();

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
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeStack}/>
        <Stack.Screen name="Dashboard" component={DashboardStack}/>
        <Stack.Screen name="Account" component={AccountStack}/>
      </Stack.Navigator> */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Recent') {
              iconName = focused
                ? 'ios-list'
                : 'ios-list-outline';
                // ? 'ios-home'
                // : 'ios-home-outline';
              size = focused ? size + 7 : size + 5;
            } else if (route.name === 'Dashboard') {
              iconName = focused 
                ? 'ios-pie-chart' 
                : 'ios-pie-chart-outline';
              size = focused ? size + 7 : size + 5;
              } else if (route.name === 'Add') {
                iconName = focused 
                  ? 'ios-add-circle-outline' 
                  : 'ios-add-circle';
                size = focused ? size + 7 : size + 5;
            } else if (route.name === 'Location') {
              iconName = focused 
                ? 'ios-location' 
                : 'ios-location-outline';
              size = focused ? size + 7 : size + 5;
            } else if (route.name === 'Account') {
              iconName = focused 
                ? 'ios-person-circle' 
                : 'ios-person-circle-outline';
              size = focused ? size + 7 : size + 5;
            }
            
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'red',
          inactiveTintColor: 'gray',
          showLabel: true,
        }}
      >
        <Tab.Screen name="Recent" component={HomeStack} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Add" component={RecordForm}/>
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}