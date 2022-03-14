// import React, { Component } from "react";
// import { Button, View, TextInput } from "react-native";
// import DateTimePicker from "react-native-modal-datetime-picker";

// let date_pick;
// export default class DatePicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isDateTimePickerVisible: false,
//     };
//   }

//   showDateTimePicker = () => {
//     date_pick = new Date(this.state.date);
//     this.setState({ isDateTimePickerVisible: true });
//   };

//   hideDateTimePicker = () => {
//     this.setState({ isDateTimePickerVisible: false });
//   };

//   handleDatePicked = date => {
//     console.log("A date has been picked: ", date);
//     this.hideDateTimePicker();
//   };

//   render() {
//     return (
//       <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
//         <Button title="Show DatePicker" onPress={this.showDateTimePicker} />
//         <DateTimePicker
//           isVisible={this.state.isDateTimePickerVisible}
//           onConfirm={this.handleDatePicked}
//           onCancel={this.hideDateTimePicker}
//           date={date_pick}
//         />
//          <TextInput value = {this.state.date} style={{width:"80%",height:20,borderColor:"red",borderWidth:1}} />
//       </View>
//     );
//   }
// }