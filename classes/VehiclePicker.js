// import React, { Component } from 'react';
// import { Container, Content, Form, Item, Picker, Icon } from 'native-base';

// export default class VehiclePicker extends Component {
//     constructor(props) {
//     super(props);
//     this.state = {
//       selected2: undefined
//     };
//   }
//   onValueChange2(value) {
//     this.setState({
//       selected2: value
//     });
//   }
//   render() {
//     return (
//       <Container>
//         <Content>
//           <Form>
//             <Item picker>
//               <Picker
//                 mode="dropdown"
//                 iosIcon={<Icon name="arrow-down" />}
//                 // style={{ width: undefined }}
//                 placeholder="Select your SIM"
//                 placeholderStyle={{ color: "#bfc6ea" }}
//                 placeholderIconColor="#007aff"
//                 selectedValue={this.state.selected2}
//                 onValueChange={this.onValueChange2.bind(this)}
//               >
//                 <Picker.Item label="Wallet" value="key0" />
//                 <Picker.Item label="ATM Card" value="key1" />
//                 <Picker.Item label="Debit Card" value="key2" />
//                 <Picker.Item label="Credit Card" value="key3" />
//                 <Picker.Item label="Net Banking" value="key4" />
//               </Picker>
//             </Item>
//           </Form>
//         </Content>
//       </Container>
//     );
//   }
// }