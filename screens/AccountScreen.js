import React, { Component } from 'react';
import { View, Button } from 'react-native';
import { Container, Header, Content, Text, Card, CardItem, Left, Thumbnail, Body, Image, Icon } from 'native-base';

// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const AccountScreen = ({ navigation }) => {
  return (
    <View style={{flex:1, marginVertical:15, alignSelf:'center'}}>
        <Button 
          onPress={() => navigation.navigate('Login')}
          title="Login"
          color="#841584"
        >
          <Icon name="log-in" />
        </Button>
    </View>
    // <Container>
    //     <Header />
    //     <Content>
    //     <Card style={{flex: 0}}>
    //         <CardItem>
    //           <Left>
    //             <Thumbnail source={{uri: 'Image URL'}} />
    //             <Body>
    //               <Text>NativeBase</Text>
    //               <Text note>April 15, 2016</Text>
    //             </Body>
    //           </Left>
    //         </CardItem>
    //         <CardItem>
    //           <Body>
    //             <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
    //             <Text>
    //               //Your text here
    //             </Text>
    //           </Body>
    //         </CardItem>
    //         <CardItem>
    //           <Left>
    //             <Button transparent textStyle={{color: '#87838B'}}>
    //               <Icon name="logo-github" />
    //               <Text>1,926 stars</Text>
    //             </Button>
    //           </Left>
    //         </CardItem>
    //       </Card>
    //       <Button block info>
    //         <Text>SIGN IN</Text>
    //       </Button>
    //     </Content>
    //   </Container>
  )
}
  
export default AccountScreen