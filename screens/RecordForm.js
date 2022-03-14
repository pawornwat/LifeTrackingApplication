import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Container, Header, Content, Item, Input, Label, Icon, Form, Button, Text, Picker } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import { Picker as SelectPicker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import firestore, { firebase } from '@react-native-firebase/firestore';

export default function RecordFrom( { navigation } ) {

  // const [currentID, setCurrentID] = useState();
  // const [totalID, setTotalID] = useState(10);
  const [transDateIn, setTransDateIn] = useState();
  const [transMonthIn, setTransMonthIn] = useState();
  const [transDayIn, setTransDayIn] = useState();
  const [transCostIn, setTransCostIn] = useState();
  const [transTypeIn, setTransTypeIn] = useState();
  const [transNoteIn, setTransNoteIn] = useState();

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

  // const getCurrentID = async () => {
  //   const usersId = await firestore().collection('record_id').get();  
  //   setCurrentID(usersId);
  // }

  const setData = async () => {
    // const increment = firebase.firestore.FieldValue.increment(1);
    // await firestore().collection('users').update({
    //   id: increment, // increment age by 1
    // });

    firestore()
      .collection('users')
      .add({
        transCost: transCostIn,
        transDate: transDateIn,
        transMonth: transMonthIn,
        transDay: transDayIn,
        transNote: transNoteIn,
        transType: transTypeIn,
        
      })
      .then(() => {
        console.log('Data added!');
        navigation.navigate('Recent');
        // setID();
      });
  }

  // const setID = () => {
  //   getCurrentID()
  //   var s = JSON.stringify(currentID);
  //   var d = JSON.parse(s);
  //   var t = Math.max(d)
  //   firestore()
  //     .collection('record_id')
  //     .add({
  //       r_id: t,
  //     })
  //     .then(() => {
  //       console.log('ID added! ' + d);
  //     });
  // }

  // useEffect( async () => {
  //   await setData();
  // });

  return (
    <View style={styles.container}>
      <View style={styles.item}>
          <View style={styles.iconRow}>
            <Ionicons name='ios-cash-outline' style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder=" $"
              onChangeText={setTransCostIn}
              value={transCostIn}
            />
          </View>
      </View>
      <View style={styles.item}>
        <Picker
          mode="dropdown"
          placeholder="Select One"
          placeholderStyle={{ color: "#2874F0" }}
          note={false}
          selectedValue={transTypeIn}
          onValueChange={(itemValue, itemIndex) => 
            setTransTypeIn(itemValue)}
        >
          <Picker.Item label="Personal Car" value="ios-car-sport" />
          <Picker.Item label="Taxi" value="ios-car" />
          <Picker.Item label="Bus" value="ios-bus" />
        </Picker>
      </View>
      {/* <View style={styles.item}>
        <View style={styles.iconRow}>
          <Ionicons ios='ios-car-outline' android='car-outline' style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="How do you go?"
            onChangeText={setTransTypeIn}
            value={transTypeIn}
          />
        </View>
      </View> */}
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
      <Button rounded success onPress={setData} style={styles.buttonAdd}>
        <Text style={styles.content}>Add</Text>
      </Button>
    </View>
  );
}

// export const MyForm = props => {

//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   // --- DateTime Picker --- //
//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = date => {
//     setTransDate(moment(date).format('YYYY-MM-DD'));
//     hideDatePicker();
//   };
//   // ----------------------- //

//   return (
//     <View style={styles.container}>
//       <View style={styles.item}>
//           <View style={styles.iconRow}>
//             <Icon ios='ios-cash-outline' android='cash-outline' style={styles.icon} />
//             <TextInput
//               style={styles.input}
//               placeholder=" $"
//               onChangeText={setCost}
//               value={cost}
//             />
//           </View>
//       </View>
//       {/* <View style={styles.item}>
//         <SelectPicker
//           selectedValue={selectedPicker}
//           onValueChange={(itemValue, itemIndex) => 
//             setSelectedPicker(itemValue)}
//         >
//           <SelectPicker.Item label="Personal Car" value="car" />
//           <SelectPicker.Item label="Taxi" value="taxi" />
//           <SelectPicker.Item label="Bus" value="bus" />
//         </SelectPicker>
//       </View> */}
//       <View style={styles.item}>
//         <View style={styles.iconRow}>
//           <Icon ios='ios-car-outline' android='car-outline' style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="How do you go?"
//             onChangeText={setTransType}
//             value={transType}
//           />
//         </View>
//       </View>
//       <View style={styles.item}>
//         <View style={styles.iconRow}>
//           <Icon ios='ios-book-outline' android='book-outline' style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Where do you go?"
//             onChangeText={setDestination}
//             value={destination}
//           />
//         </View>
//       </View>
//       <View style={styles.item}>
//         <View style={styles.iconRow}>
//           <Icon ios='ios-calendar-outline' android='calendar-outline' style={styles.icon} />
//           <Button transparent light onPress={showDatePicker} style={styles.button}>
//             { !transDate ? <Text>Select Date</Text> : <Text>{moment(transDate).format('YYYY-MM-DD')}</Text> }
//           </Button>
//         </View>
//         <DateTimePickerModal
//           isVisible={isDatePickerVisible}
//           mode="date"
//           onConfirm={handleConfirm}
//           onCancel={hideDatePicker}
//           date={moment(transDate).toDate()}
//         />
//       </View>
//       <Button rounded success onPress={setData} style={styles.buttonAdd}>
//         <Text style={styles.content}>Add</Text>
//       </Button>
//     </View>
//   );
// };

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
  buttonAdd: {
    height: 40,
    width: 250,
    justifyContent:'center',
    alignSelf:'center',
    marginLeft: 15,
    marginTop: 30,
    marginBottom: 10,
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
