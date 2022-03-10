import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Title, Form, Item, Input, Label } from 'native-base';

const RegisterScreen = () => {
  return (
    <Container>
        <Header>
            <Left>
                <Button transparent>
                    <Icon name='arrow-back' />
                </Button>
            </Left>
            <Body>
                <Title>SIGN UP</Title>
            </Body>
            <Content>
                <Form>
                <Item floatingLabel>
                        <Label>E-mail</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Password</Label>
                        <Input />
                    </Item>
                    <Button block info>
                        <Text>SIGN UP</Text>
                    </Button>
                    
                </Form>
            </Content>

        </Header>

    </Container>
);
}

export default RegisterScreen