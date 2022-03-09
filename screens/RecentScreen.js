import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

const RecentScreen = () => {
  return (
    <View>
      <View style={{flexDirection:'row', paddingTop:20, padding:50}}>
        <TouchableOpacity>
          <Text>Last Month</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>This Month</Text>
        </TouchableOpacity>
      </View>
      <Text>Recent</Text>
    </View>
  )
}

export default RecentScreen