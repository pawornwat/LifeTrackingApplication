import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar, Modal, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Left, Right, Body } from 'native-base';
import { ListItem } from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const TopTab = createMaterialTopTabNavigator();
import { useNavigation } from '@react-navigation/native';

const ThisMonth = () => {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date();
  return (
      renderContent(months[date.getMonth()])
  );
}

const LastMonth = () => {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date();
  return (
    renderContent(months[date.getMonth()-1])
  );
}

const NextMonth = () => {
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date();
  return (
    renderContent(months[date.getMonth()+1])
  );
}

export {ThisMonth, LastMonth, NextMonth};

const readData = (month) => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  // console.log(`${month}`);

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .where('transMonth', 'in', [month])
      .orderBy('transDate', 'desc')
      .onSnapshot(querySnapshot => {
        const records = [];

        querySnapshot.forEach(documentSnapshot => {
          records.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        },
          error => {
            console.log(error)
          }
        );
  
      setRecords(records);
      setLoading(false);
      // console.log(`${JSON.stringify(records)} fetch data successfully`) //${JSON.stringify(month)}
      },
        error => {
          console.log(error)
        }
      );
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return records;
}

const renderContent = (month) => {

  const navigation = useNavigation();

  const renderItem = ({item, index}) => {

    if (item._id === '') {
      return (
          <Body>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.content}>{item.transMonth}</Text>
            </View>
          </Body>
      )
    } else {
      return (
        <ScrollView>
            <TouchableOpacity 
              onLongPress={() => {
                navigation.navigate('Detail', {
                  key: item.key,
                  transCost: item.transCost,
                  transDate: item.transDate,
                  transMonth: item.transMonth,
                  transDay: item.transDay,
                  transEstTime: item.transEstTime,
                  transNote: item.transNote,
                  transType: item.transType,                
                });
                // console.log('Long Press', item.key)
              }}
              delayLongPress={800}
            >
              <ListItem.Content style={styles.itemHeader}>
                <View style={{flexDirection:'row'}}>
                  <Left>
                    <Text style={styles.dateTitle}> {item.transDate} </Text>
                  </Left>
                  <Right>
                    <Text style={styles.date}> {item.transDay} </Text>
                  </Right>
                </View>
              </ListItem.Content>
              <ListItem.Content style={styles.item}>
                <View style={{flexDirection:'row'}}>
                  <Left>
                    <Ionicons name={item.transType} size={32} style={styles.icon}></Ionicons>                   
                  </Left>
                  <Body>
                    <Text style={styles.content}> {item.transNote} </Text>
                  </Body>
                  <Right>
                    <Text style={styles.cost}> {item.transCost} ฿</Text>
                    {/* <Text> TEST </Text> */}
                  </Right>
                </View>
              </ListItem.Content>
            </TouchableOpacity>
        </ScrollView>        
      )  
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={readData(month)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const RecentScreen = () => {
  return (
    <TopTab.Navigator initialRouteName="This Month">
      <TopTab.Screen name="Last Month" component={LastMonth} />
      <TopTab.Screen name="This Month" component={ThisMonth} />
      <TopTab.Screen name="Next Month" component={NextMonth} />
    </TopTab.Navigator>
  );
};

export default RecentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d7dbdb',
    // marginTop: 10,
    // marginTop: StatusBar.currentHeight || 0,
    
  },
  itemHeader: {
    backgroundColor: '#f7fafa',
    padding: 10,
    marginVertical: 1,
    marginTop: 10,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#e9f2f1',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    color: 'grey',
  },
  icon: {
    color: 'grey',
    marginLeft: 10,
  },
  content: {
    width: 230,
    fontSize: 18,
    color: 'grey',
    alignSelf: 'auto',
    textAlign: 'auto',
    // borderWidth: 1,
    marginTop: 5,
    // padding: 10,
  },
  dateTitle: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: 'grey',
    alignSelf:'flex-end',
  },
  cost: {
    fontSize: 18,
    color: 'grey',
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
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});