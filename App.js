import * as React from 'react';
import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import RecentScreen from './screens/RecentScreen';
import DashboardScreen from './screens/DashboardScreen';
import LocationScreen from './screens/LocationScreen';
import HistoryScreen from './screens/HistoryScreen';
import AccountScreen from './screens/AccountScreen';

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
        options={{title: 'Account'}}
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Recent') {
              iconName = focused
                ? 'ios-list'
                : 'ios-list-outline';
            } else if (route.name === 'Dashboard') {
              iconName = focused 
                ? 'ios-pie-chart' 
                : 'ios-pie-chart-outline';
            } else if (route.name === 'Location') {
              iconName = focused 
                ? 'ios-location' 
                : 'ios-location-outline';
            } else if (route.name === 'History') {
              iconName = focused 
                ? 'ios-time' 
                : 'ios-time-outline';
            } else if (route.name === 'Account') {
              iconName = focused 
                ? 'ios-person-circle' 
                : 'ios-person-circle-outline';
            }
            
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >

        <Tab.Screen name="Recent" component={RecentScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Account" component={AccountStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}