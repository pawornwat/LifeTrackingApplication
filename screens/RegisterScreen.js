import React, { Component } from 'react';
import { Text, Image,View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Body, Title, Form, Item, Input, Label } from 'native-base';

const RegisterScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
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
                <Button block info
                    style={{ margin: 15, alignContent: 'center' }}
                >
                    <Text>SIGN UP</Text>
                </Button>

            </Form>
        </View>
    )
}

export default RegisterScreen