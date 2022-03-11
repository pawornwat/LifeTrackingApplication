import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';

import { Container, Header, Content, Item, Input, Label, Icon, Form, Button } from 'native-base';

import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import VehiclePicker from '../classes/VehiclePicker';
import DatePicker from '../classes/DatePicker';

// export class setDatePicker extends Component {
//     constructor() {
//         super()
//         this.state = {
//             isVisible: false,
//             chosenDate: ''
//         }
//     }

//     handlePicker = ( date ) => {
//         this.setState({
//             isVisible: false,
//             chosenDate: moment(date).format('MMMM, Do YYYY HH:mm')
//         })
//     };

//     showPicker = () => {
//         this.setState({
//             isVisible: true
//         })
//     }

//     hidePicker = () => {
//         this.setState({
//             isVisible: false
//         })
//     }
// }

export default function RecordFrom() {
  return (
    <Formik
      initialValues={{
        transportType: '',
        // destination: '',
        // cost: '',
        myDate: moment().format('YYYY-MM-DD'),
      }}
      onSubmit={values => console.log(values)}>
      {({handleSubmit, values, setFieldValue}) => (
        <MyForm
          values={values}
          setFieldValue={setFieldValue}
          handleSubmit={handleSubmit}
        />
      )}
    </Formik>
  );
}

export const MyForm = props => {
  
  const [selectValue, setSelectValue] = useState();
  //const [datePicker, setDatePicker] = useState();

  const {handleSubmit, values, setFieldValue} = props;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setFieldValue('myDate', moment(date).format('YYYY-MM-DD'));
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder="$"
        onChangeText={setFieldValue('cost')}
        value={props.values.cost}
      /> */}
      {/* <Picker
        onValueChange={(itemValue, itemIndex) => setFieldValue(itemValue)}
        selectedValue={values.transportType}
      >
        <Picker.Item label="Personal Car" value="Personal Car" />
        <Picker.Item label="Taxi" value="Taxi" />
        <Picker.Item label="Bus" value="Bus" />
      </Picker> */}
      {/* <TextInput
        style={styles.input}
        placeholder="Personal Car, Taxi, Bus"
        onChangeText={e => setSelectedValue(e.target.value)}
        value={selectedValue}
      /> */}
      {/* <TextInput
        style={styles.input}
        placeholder="Destination"
        onChangeText={setFieldValue('destination')}
        value={props.values.destination}
      /> */}
      <View>
        <Button onPress={showDatePicker}>
            <Text>Select Date</Text>
        </Button>
        <Text>Test</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={moment(values.myDate).toDate()}
      />
      <Button title="Add" color="maroon" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});
