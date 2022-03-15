import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Modal,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {Left, Right, Body} from 'native-base';
import {ListItem} from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OpenModal from './OpenModal';

const TopTab = createMaterialTopTabNavigator();
import {useNavigation} from '@react-navigation/native';
import {parse} from 'react-native-svg';

const ThisMonth = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let date = new Date();
  const monthNow = months[date.getMonth()];
  // const monthNow = currentMonth[0];
  return DashboardScreen(monthNow);
};

function LastMonth() {
  return DashboardScreen();
}

function NextMonth() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>No List!</Text>
    </View>
  );
}

export {ThisMonth, LastMonth, NextMonth};

const readData = monthNow => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .onSnapshot(querySnapshot => {
        const records = [];

        querySnapshot.forEach(documentSnapshot => {
          records.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setRecords(records);
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  // console.log("records =>> "+JSON.stringify(records));
  console.log('records Data =>> ' + JSON.stringify(records[1]));
  // console.log("month =>> "+months)
  var arrData = [];
  for (var month in months) {
    var totalPrice = 0;
    var totalMonth = "";
    var totalTime = 0;
    for (var index in records) {
      // console.log('month =>> ' + months[month]);
      if (records[index]['transMonth'] == months[month]) {
        totalPrice += parseInt(records[index]['transCost']);
        totalMonth = months[month]
        totalTime += parseInt(records[index]['transEstTime']);

      }
    }
    if(totalMonth){
      var data={
        totalPrice: totalPrice,
        totalMonth: totalMonth,
        totalTime: totalTime,
      }
      console.log(data);
      arrData.push(data);
    }
  }
  console.log(arrData);
  // setTotalRecords(arrData);

  return arrData;
};

const DashboardScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    console.log("item =>> "+JSON.stringify(item));
    console.log("index =>> "+index);
    return (
      <ScrollView>
        <TouchableOpacity delayLongPress={800}>
          <ListItem.Content style={styles.item}>
            <View style={{flexDirection: 'row'}}>
              <Left>
                <Text style={styles.content}> {item.totalMonth}  </Text>
              </Left>
              <Body></Body>
              <Right>
                <Text style={styles.cost}> {item.totalPrice}฿</Text>
              </Right>
            </View>
          </ListItem.Content>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={readData()}
        keyExtractor={item => item.key}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default DashboardScreen;

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
    alignSelf: 'flex-end',
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
