import SQLite from 'react-native-sqlite-storage';

SQLite.deleteDatabase(
    {name: 'MainDB', location: 'default'},  
    () => { console.log('second db deleted');  },
    error => {
        console.log("ERROR: " + error); 
    }
);

import { View, Text } from 'react-native'
import React from 'react'

const DeleteDB = () => {
  return (
    <View>
      <Text>DeleteDB</Text>
    </View>
  )
}

export default DeleteDB