import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Button, Text, Picker } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import firestore from '@react-native-firebase/firestore';

const DetailScreen = ({ route, navigation }) => {

    const { key, transCost, transDate, transMonth, transDay, transEstTime, transType, transNote } = route.params;
    // console.log({transCostIn, transDateIn, transMonthIn, transDayIn, transNoteIn, transTypeIn});

    const [transDateIn, setTransDateIn] = useState(transDate);
    const [transMonthIn, setTransMonthIn] = useState(transMonth);
    const [transDayIn, setTransDayIn] = useState(transDay);
    const [transEstTimeIn, setTransEstTimeIn] = useState(transEstTime);
    const [transCostIn, setTransCostIn] = useState(transCost);
    const [transTypeIn, setTransTypeIn] = useState(transType);
    const [transNoteIn, setTransNoteIn] = useState(transNote);
  
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  
    // --- DateTime Picker --- //
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = date => {
      setTransDateIn(moment(date).format('DD MMM YYYY').toString());
      setTransMonthIn(moment(date).format('MMMM').toString())
      setTransDayIn(moment(date).format('dddd').toString())
      hideDatePicker();
    };
    // ----------------------- //
  
    const updateData = () => {

        firestore()
        .collection('users')
        .doc(key)
        .update({
          transCost: transCostIn,
          transDate: transDateIn,
          transMonth: transMonthIn,
          transDay: transDayIn,
          transEstTime: transEstTimeIn,
          transNote: transNoteIn,
          transType: transTypeIn,
        })
        .then(() => {
          console.log('Data updated!');
          navigation.goBack();
        });
    }

    const removeData = async () => {

        await firestore()
        .collection('users')
        .doc(key)
        .delete()
        .then(() => {
          console.log('Data deleted!');
          navigation.goBack();
        });      
    }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
          <View style={styles.iconRow}>
            <Ionicons name='ios-cash-outline' style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="How much it cost?"
              onChangeText={setTransCostIn}
              value={transCostIn}
              keyboardType={'number-pad'}
            />
          </View>
      </View>     
      <View style={styles.item}>
        <View style={styles.iconRow}>
          <Ionicons name='ios-time-outline' style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="How long it take?"
            onChangeText={setTransEstTimeIn}
            value={transEstTimeIn}
            keyboardType={'number-pad'}
          />
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.iconRow}>
          <Ionicons name='ios-book-outline' style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Where do you go?"
            onChangeText={setTransNoteIn}
            value={transNoteIn}
          />
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.iconRow}>
          <Ionicons name='ios-car-outline' style={styles.icon} />
          <Picker
            mode="dropdown"
            placeholder="Select One"
            placeholderStyle={{ color: "#2874F0" }}
            note={false}
            selectedValue={transTypeIn}
            onValueChange={(itemValue, itemIndex) => 
              setTransTypeIn(itemValue)}
          >
            <Picker.Item label="   Personal Car" value="ios-car-sport" />
            <Picker.Item label="   Taxi" value="ios-car" />
            <Picker.Item label="   Bus" value="ios-bus" />
          </Picker>
        </View>
      </View>
      <View style={styles.item}>
        <View style={styles.iconRow}>
          <Ionicons name='ios-calendar-outline' style={styles.icon} />
          <Button transparent light onPress={showDatePicker} style={styles.button}>
            { !transDateIn ? <Text>Select Date</Text> : <Text>{transDateIn}</Text> }
          </Button>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
      <View style={{flexDirection:'row', alignSelf:"center"}}>
      <Button iconLeft rounded success onPress={updateData} style={styles.buttonSave}>
        <Ionicons name='ios-save-outline' style={styles.buttonIcon}/>
        <Text style={styles.content}>SAVE</Text>
      </Button>
      <Button iconLeft rounded danger onPress={removeData} style={styles.buttonRemove}>
        <Ionicons name='ios-trash-outline' style={styles.buttonIcon}/>
        <Text style={styles.content}>REMOVE</Text>
      </Button>
      </View>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //flexDirection:'column',
    },
    input: {
      height: 40,
      width: 250,
      borderWidth: 0,
      borderColor: '#ddd',
      color: '#1c1a1a',
      padding: 10,
      fontSize: 18,
      borderRadius: 6,
      marginLeft: 15,
    },
    buttonSave: {
      height: 40,
      width: 150,
      justifyContent:'center',
      alignSelf:'center',
      marginLeft: 15,
      marginTop: 30,
      marginBottom: 10,
    },
    buttonRemove: {
      height: 40,
      width: 150,
      justifyContent:'center',
      alignSelf:'center',
      marginLeft: 15,
      marginTop: 30,
      marginBottom: 10,
    },
    buttonIcon: {
      color: "#fcf7f7",
      fontSize: 20,
    },      
    content: {
      color: '#fcf7f7',
      fontSize: 18,
    },
    iconRow: {
      height: 40,
      flexDirection: "row",
      //flex: 1,
      marginRight: 10,
      marginLeft: 30,
      marginTop: 10,
    },
    item: {
      flexDirection: 'column',
      //flex: 1,
      marginTop: 10,
    },
    itemPicker: {
      flexDirection: 'row',
      marginLeft: 10,
      marginTop: 10,
    },
    icon: {
      color: "rgba(128,128,128,1)",
      fontSize: 30,
      marginTop: 5
    },
    button: {
      height: 40,
      width: 250,
      borderWidth: 0,
      borderColor: "#000000",
      marginLeft: 15,
      justifyContent:'center',
      borderBottomColor: 'red',
      borderBottomWidth: 2,
      marginBottom: 30,
    },
    headerWrapper: {
      borderBottomColor: 'red',
      borderBottomWidth: 2,
      marginBottom: 30,
    },
    header: {
        fontSize: 36,
        alignSelf: 'auto',
        color: 'red',
  
    },
  });
  