import React, { useState } from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity, Modal } from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import RecordForm from './RecordForm';

const TopTab = createMaterialTopTabNavigator();

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    day: 'Monday',
    date: '10',
    month: 'March',
    year: '2022',
    cost: '150$',
    iconType: 'ios-car-sport',
    destination: 'Home',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    day: 'Tuesday',
    date: '11',
    month: 'March',
    year: '2022',
    cost: '120$',
    iconType: 'ios-bus',
    destination: 'Central',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    day: 'Friday',
    date: '14',
    month: 'March',
    year: '2022',
    cost: '180$',
    iconType: 'ios-car',
    destination: 'Secon',
  },
];

function ThisMonth() {
  return (
    renderContent()
  );
}

function LastMonth() {
  return (
    renderContent()
  );
}

function NextMonth() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>No List!</Text>
    </View>
  );
}

export { ThisMonth, LastMonth, NextMonth };

const Item = ({ day, date, month, year, iconType, destination, cost }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{day}</Text>
    <Text style={styles.content}>{date} {month} {year}</Text>
    <Text style={styles.content}><Ionicons name={iconType} size={32} /> {destination} {cost}</Text>
  </View>
);

function renderContent() {
  const renderItem = ({ item }) => (
    <Item day={item.day} 
          date={item.date}
          month={item.month}
          year={item.year}
          iconType={item.iconType}
          destination={item.destination}
          cost={item.cost}
    />
  );

  const [modalOpen, setModalOpen] = useState(false);

  return(
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />

      <Modal visible={modalOpen} animationType='slide'>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={ ()=> setModalOpen(false) }
          >
            {/* <Ionicons name='ios-close-sharp' size={30} color={'#f50d05'} style={{alignSelf:'flex-end', paddingRight:15, paddingVertical:15 , ...styles.modalToggle, ...styles.modalClose}}/> */}
            <Ionicons name='ios-close-sharp' size={24} color={'#f50d05'} style={{ ...styles.modalToggle, ...styles.modalClose }}/>
          </TouchableOpacity>
          
          {/* Render RecordForm */}
          <RecordForm />
        </View>
      </Modal>

      <TouchableOpacity
        onPress={ ()=> setModalOpen(true) }
      >
        {/* <Ionicons name='ios-add-circle' size={60} color={'#23b4f7'} style={{alignSelf:'flex-end', paddingRight:25, ...styles.modalToggle}}/> */}
        <Ionicons name='ios-add-circle' size={60} color={'#23b4f7'} style={{ ...styles.modalToggle }}/>
      </TouchableOpacity>
      {/* <Text>Test</Text> */}
    </SafeAreaView>
  );
}

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

const RecentScreen = () => {
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

export default RecentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#23b4f7',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
  content: {
    fontSize: 16,
    color: 'white',
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop:20,
    marginBottom:0,
  },
  modalContent: {
    flex:1,
  },
});