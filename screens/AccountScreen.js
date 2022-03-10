import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';

const AccountScreen = ({navigate}) => {
  return (
    <Container>
        <Header />
        <Content>
        <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: 'Image URL'}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                  //Your text here
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
          <Button block info>
            <Text>SIGN IN</Text>
          </Button>
        </Content>
      </Container>
  )
}
  


export default AccountScreen