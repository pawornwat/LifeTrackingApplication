import * as React from 'react';
import { Text, View } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import RecentScreen from '../screens/RecentScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RecordForm from '../screens/RecordForm';
import LocationScreen from '../screens/LocationScreen';
import AccountScreen from '../screens/AccountScreen';
import DetailScreen from '../screens/DetailScreen';
import SignIn from '../screens/SignIn';

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
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
        <Tab.Screen name="Recent" component={RecentScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="Add" component={RecordForm}/>
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator> 
  );
}

export default Tabs