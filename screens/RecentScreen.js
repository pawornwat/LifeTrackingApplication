import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { ListItem, Left, Body, Right } from 'native-base';

import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecordForm from './RecordForm';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OpenModal from './OpenModal';

const TopTab = createMaterialTopTabNavigator();

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

// useEffect(() => {
//   const subscriber = firestore()
//     .collection('users')
//     .orderBy('transDate', 'desc')
//     .get()
//     .then(querySnapshot  => {
//       const records = [];

//       querySnapshot.forEach(documentSnapshot => {
//         records.push({
//           ...documentSnapshot.data(),
//           key: documentSnapshot.id,
//         });
//       });

//     setRecords(records);
//     setLoading(false);

//     });

//   return () => subscriber();
// }, []);

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

// useEffect( async ()=>{
//   await readData();
// });

const renderContent = monthNow => {

  // const iconType = [
  //   {
  //     key1: 'ios-car-sport',
  //     key2: 'ios-bus',
  //     key3: 'ios-car'
  //   }
  // ];

  // const Item = ({ transCost, transDate, transNote, transType }) => (
  //   <View style={styles.item}>
  //     <View style={{flexDirection:'row'}}>
  //       <View style={{flexDirection:"column"}}>
  //         <Text style={styles.date}> {transDate} </Text>
  //       </View>
  //       <Text style={styles.cost}> {transCost} $ </Text>
  //     </View>
  //     <View style={{flexDirection:'row', marginTop:10}}>
  //       <Ionicons name={transType} size={32} style={styles.icon}/>
  //       <Text style={styles.content}> {transNote} </Text>
  //     </View>
  //   </View>
  // );

  // const renderItem = ({ item }) => (
  //   <Item
  //         id={item.id}
  //         transCost={item.transCost}
  //         transDate={item.transDate}
  //         transNote={item.transNote}
  //         transType={item.transType}
  //   />
  // );

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
        data={readData(monthNow)}
        renderItem={({item}) => ( 

            <ScrollView>
                <ListItem style={styles.itemHeader}>
                  <Left>
                    <Text style={styles.dateTitle}> {item.transDate} </Text>
                  </Left>
                  <Right>
                      <Text style={styles.date}> {item.transDay} </Text>
                  </Right>
                </ListItem>
                <ListItem style={styles.item}>
                    <Left>
                      <Ionicons name={item.transType} size={32} style={styles.icon} />
                      <Text style={styles.content}> {item.transNote} </Text>
                    </Left>
                    <Right>
                      <Text style={styles.cost}> {item.transCost} ฿</Text>
                    </Right>
                </ListItem>
              
            </ScrollView>
            
            // <View style={styles.item}>
            //   <View style={{flexDirection: 'row'}}>
            //     <View style={{flexDirection: 'column'}}>
            //       <Text style={styles.dateTitle}> {item.transDay} </Text>
            //       <Text style={styles.date}> {item.transDate} </Text>
            //     </View>
            //     <Text style={styles.cost}> {item.transCost} ฿</Text>
            //   </View>
            //   <View style={{flexDirection: 'row', marginTop: 10}}>
            //     <Ionicons name={item.transType} size={32} style={styles.icon} />
            //     <Text style={styles.content}> {item.transNote} </Text>
            //   </View>
            // </View>
        )}
      />

    {/* {renderModal()} */}

    <OpenModal />

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
    marginTop: StatusBar.currentHeight || 0,
  },
  itemHeader: {
    backgroundColor: '#23b4f7',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#23b4f7',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
  content: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    // marginHorizontal: 30,
    marginLeft: 30,
  },
  dateTitle: {
    fontSize: 16,
    color: 'white',
  },
  date: {
    fontSize: 14,
    color: 'white',
  },
  cost: {
    fontSize: 18,
    color: 'white',
  },
  icon: {
    color: 'white',
    marginLeft: 10,
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