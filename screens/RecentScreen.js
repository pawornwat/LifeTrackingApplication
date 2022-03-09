import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function ThisMonth() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This Month!</Text>
    </View>
  );
}

function LastMonth() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Last Month!</Text>
    </View>
  );
}

function NextMonth() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Next Month!</Text>
    </View>
  );
}

const RecentScreen = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="This Month" component={ThisMonth} />
      <Tab.Screen name="Last Month" component={LastMonth} />
      <Tab.Screen name="Next Month" component={NextMonth} />
    </Tab.Navigator>
  );
}

export default RecentScreen