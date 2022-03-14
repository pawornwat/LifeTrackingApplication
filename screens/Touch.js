import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar, Modal, ScrollView, ActivityIndicator, TouchableOpacity, TouchableHighlight } from 'react-native';
import { ListItem, Left, Body, Right, Item } from 'native-base';

import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecordForm from './RecordForm';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OpenModal from './OpenModal';

const DData = [
    {id: 1, text: 'item One'},
    {id: 2, text: 'item Two'},
    {id: 3, text: 'item Three'},
    {id: 4, text: 'item Four'},
]

const readData = () => {
    const [loading, setLoading] = useState(true);
    const [records, setRecords] = useState([]);
    // const [records, setRecords] = useState([{
    //     transDay: {},
    //     transCost: {},
    //     transNote: {},
    //     transDate: {},
    //     transMonth: {},
    //     transType: {},
    //     key: {},
    // }]);
  
    useEffect(() => {
      const subscriber = firestore()
        .collection("users")
        .onSnapshot(querySnapshot  => {
          const recordsIn = [];
  
          querySnapshot.forEach(documentSnapshot => {
            recordsIn.push({
              ...documentSnapshot.data(),
              key: documentSnapshot.id,
            });
          });
    
        setRecords(recordsIn);
        setLoading(false);
        // console.log(Object.keys(records))
        // console.log(`${JSON.stringify(records)} fetch data successfully`)
        });
      return () => subscriber();
    }, []);
  
    if (loading) {
      return <ActivityIndicator />;
    }
    return records;
  }

const Touch = () => {
    const userCollection = firestore().collection('users')
    const docID = userCollection.documentID
    const [data, setData] = useState(readData())
    // const [isRender, setIsRender] = useState(false)

    const renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={styles.item}
            >
                <Text style={styles.text}>{item.transDay}</Text>
                
                
            </TouchableOpacity>
        )
    }

    // console.log(Object.values(readData()))
    // console.log(Object.keys(data))

  return (
    <SafeAreaView>
        <FlatList
            data={readData()}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
            // extraData={isRender}
        />
    </SafeAreaView>
  )
}

export default Touch

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        borderBottomWidth: 50,
        borderBottomColor: 'grey',
        alignItems: 'flex-start',    
    },
    text: {
        marginVertical: 30,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 10,
    },
})