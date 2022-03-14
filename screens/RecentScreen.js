import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar, Modal, ScrollView, ActivityIndicator, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Left, Body, Right, Row } from 'native-base';
import { ListItem } from 'react-native-elements';

import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecordForm from './RecordForm';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OpenModal from './OpenModal';
import DetailScreen from './DetailScreen';

const TopTab = createMaterialTopTabNavigator();
import { useNavigation } from '@react-navigation/native';

const ThisMonth = () => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = new Date();
  const monthNow = months[date.getMonth()]
  // const monthNow = currentMonth[0];
  return (
      renderContent(monthNow)
    );
}

// function ThisMonth() {
//   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//   let date = new Date();
//   const monthNow = months[date.getMonth()]
//   return (
//       renderContent(monthNow)
//     );
// }

function LastMonth() {
  return renderContent();
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

  useEffect(() => {
    const subscriber = firestore()
      .collection("users")
      .where("transMonth", "==", 'March')
      // .orderBy('transDate', 'desc')
      .onSnapshot(querySnapshot  => {
        const records = [];

        querySnapshot.forEach(documentSnapshot => {
          records.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
      setRecords(records);
      setLoading(false);
      // console.log(`${monthNow} fetch data successfully`) //${JSON.stringify(monthNow)}
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return records;
}

const renderContent = () => {

  const navigation = useNavigation();

  const renderItem = ({item, index}) => {
    return (
      <ScrollView>
          <TouchableOpacity 
            onLongPress={() => {
              navigation.navigate('Location');
              console.log('Long Press')
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
                  <Text style={styles.content}> {item.transNote} </Text>
                </Left>
                <Right>
                  <Text style={styles.cost}> {item.transCost} ฿</Text>
                </Right>
              </View>
            </ListItem.Content>
          </TouchableOpacity>
      </ScrollView>
    )
  }

  // function renderModal() {
  //   const [modalOpen, setModalOpen] = useState(false);
  //   return (
  //     <SafeAreaView>
  //       <Modal visible={modalOpen} animationType="slide">
  //         <View style={styles.modalContent}>
  //           <TouchableOpacity onPress={() => setModalOpen(false)}>
  //             <Ionicons name="ios-close-sharp" size={24} color={'#f50d05'} style={{...styles.modalToggle, ...styles.modalClose}} />
  //           </TouchableOpacity>

  //           {/* Render RecordForm */}
  //           <RecordForm />
  //           {/* Render RecordForm */}

  //         </View>
  //       </Modal>
  //       <TouchableOpacity onPress={() => setModalOpen(true)}>
  //         <Ionicons name="ios-add-circle" size={60} color={'#23b4f7'} style={{...styles.modalToggle}} />
  //       </TouchableOpacity>
  //     </SafeAreaView>
  //   );
  // }

  // const [modalOpen, setModalOpen] = useState(false);

  // const arrRecords = Object.values(readData());

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={readData()}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        // onPress={() => { navigation.navigate('Detail'); }}
      />

    {/* {renderModal()} */}

    {/* <OpenModal /> */}

    </SafeAreaView>
  );
}

function RecentTabs() {
  return (
    <TopTab.Navigator initialRouteName="This Month">
      <TopTab.Screen name="Last Month" component={LastMonth} />
      <TopTab.Screen name="This Month" component={ThisMonth} />
      <TopTab.Screen name="Next Month" component={NextMonth} />
    </TopTab.Navigator>
  );
}

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
    fontSize: 18,
    color: 'grey',
    // alignSelf:'center',
    // marginLeft: 50,
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

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: StatusBar.currentHeight || 0,
//   },
//   itemHeader: {
//     backgroundColor: '#23b4f7',
//     padding: 10,
//     marginVertical: 1,
//     marginHorizontal: 16,
//   },
//   item: {
//     backgroundColor: '#23b4f7',
//     padding: 10,
//     marginVertical: 1,
//     marginHorizontal: 16,
//     marginBottom: 15,
//   },
//   title: {
//     fontSize: 24,
//     color: 'white',
//   },
//   content: {
//     fontSize: 18,
//     color: 'white',
//     marginLeft: 30,
//   },
//   dateTitle: {
//     fontSize: 18,
//     color: 'white',
//   },
//   date: {
//     fontSize: 14,
//     color: 'white',
//   },
//   cost: {
//     fontSize: 22,
//     color: 'white',
//     marginLeft: 150,
//     marginRight: 20,
//     alignSelf: 'center',
//   },
//   icon: {
//     color: 'white',
//     marginLeft: 15,
//   },
//   modalToggle: {
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#f2f2f2',
//     padding: 10,
//     borderRadius: 10,
//     alignSelf: 'center',
//   },
//   modalClose: {
//     marginTop: 20,
//     marginBottom: 0,
//   },
//   modalContent: {
//     flex: 1,
//   },
// });