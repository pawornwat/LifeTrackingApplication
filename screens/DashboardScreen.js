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
  Animated
} from 'react-native';
import {Left, Right, Body} from 'native-base';
import {ListItem} from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';

// const TopTab = createMaterialTopTabNavigator();
import {useNavigation} from '@react-navigation/native';
// import { Animated } from 'react-native-maps';
// import {parse} from 'react-native-svg';

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
  // console.log('records Data =>> ' + JSON.stringify(records[1]));
  // console.log("month =>> "+months)
  var arrData = [];
  for (var month in months) {
    var totalPrice = 0;
    var totalMonth = '';
    var totalTime = 0;
    for (var index in records) {
      // console.log('month =>> ' + months[month]);
      if (records[index]['transMonth'] == months[month]) {
        totalPrice += parseInt(records[index]['transCost']);
        totalMonth = months[month];
        totalTime += parseInt(records[index]['transEstTime']);
      }
    }
    if (totalMonth) {
      var data = {
        totalPrice: totalPrice,
        totalMonth: totalMonth,
        totalTime: totalTime,
      };
      console.log(data);
      arrData.push(data);
    }
  }
  // console.log(arrData);
  // setTotalRecords(arrData);

  return arrData;
};

const Progress = ({step, steps, height}) => {
  const [width, setWidth] = React.useState(0);
  const animatedValue = React.useRef(new Animated.Value(-1000)).current;
  const reactive = React.useRef(new Animated.Value(-1000)).current;

  React.useEffect(() =>{
    Animated.timing(animatedValue,{
      toValue:reactive,
      duration:300,
      useNativeDriver:true,
    }).start();
  },[])

  React.useEffect(()=>{
    reactive.setValue(-width+(width * step)/steps);

  },[step,width])

  return (
    <>
      <Text style={{fontSize:12,fontWeight:'900',marginBottom:8}}>{step}/{steps}</Text>
      <View
      onLayout={(e) =>{
        const newWidth = e.nativeEvent.layout.width;
        setWidth(newWidth);
      }}
        style={{
          height,
          backgroundColor: 'white',
          borderRadius: height,
          width:300,
          overflow: 'hidden',
          // borderWidth: 1
        }}>
        <Animated.View
          style={{
            height,
            width: '100%',
            borderRadius: height,
            backgroundColor: 'red',
            position: 'absolute',
            left: 0,
            top: 0,
            transform:[{
              translateX: animatedValue,
            }]
          }}
        />
      </View>
    </>
  );
};

const DashboardScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    console.log('item =>> ' + JSON.stringify(item));
    console.log('index =>> ' + index);
    return (
      <ScrollView>
        <TouchableOpacity delayLongPress={800}>
          <ListItem.Content style={styles.itemHeader}>
            <View style={{flexDirection: 'row'}}>
              <Left>
                <Text style={styles.dateTitle}> {item.totalMonth} </Text>
              </Left>
              <Right>
                <Text style={styles.cost}> Total Cost {item.totalPrice} ฿</Text>
              </Right>
            </View>
          </ListItem.Content>
          <ListItem.Content style={styles.item}>
            <View style={{flexDirection: 'row'}}>
              <Left><Progress step={item.totalTime} steps={2500} height={20} /></Left>
              <Body></Body>
              <Right>
                <Text style={styles.date}> {item.totalTime} min</Text>
              </Right>
            </View>
          </ListItem.Content>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Progress step={150} steps={2500} height={20} /> */}
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
