import React, { useState, useEffect, createContext } from 'react';
import { ActivityIndicator, FlatList, View, Text, StyleSheet, StatusBar, SafeAreaView, Modal, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';

export const RecordContext = createContext()

export function Records() {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [records, setRecords] = useState([]); // Initial empty array of users

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
  
    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <RecordContext.Provider value={records}>
        <SafeAreaView style={styles.container}>
            <FlatList
                data={records}
                renderItem={({ item }) => (
                <View style={{ marginTop: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={styles.item}>
                        <View style={{flexDirection:'row'}}>
                        <View style={{flexDirection:"column"}}>
                            <Text style={styles.date}> {item.transDate} </Text>
                        </View>
                        <Text style={styles.cost}> {item.transCost} ฿</Text>
                        </View>
                        <View style={{flexDirection:'row', marginTop:10}}>
                        <Ionicons name={item.transType} size={32} style={styles.icon}/>
                        <Text style={styles.content}> {item.transNote} </Text>
                        </View>
                    </View>
                </View>
                )}
            />

            { renderModal() }

        </SafeAreaView>  
    </RecordContext.Provider>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#23b4f7',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 24,
      color: 'white',
    },
    content: {
      fontSize: 18,
      color: 'white',
      marginLeft: 30,
    },
    date: {
      fontSize: 14,
      color: 'white',
    },
    cost: {
      fontSize: 22,
      color: 'white',
      marginLeft: 150,
      marginRight: 20,
      alignSelf: 'center',
    },
    icon: {
      color: 'white',
      marginLeft: 15,
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

{/* <FlatList
    data={records}
    renderItem={({ item }) => (
    <View style={{ marginTop: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Trans Date: {item.transDate}</Text>
        <Text>Trans Type: {item.transType}</Text>
        <Text>Trans Note: {item.transNote}</Text>
        <Text>Trans Cost: {item.transCost}</Text>
    </View>
    )}
/> */}