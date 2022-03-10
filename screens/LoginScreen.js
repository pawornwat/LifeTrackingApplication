import React, { Component } from 'react';
import { Container, Header, Left, Body, Button, Icon, Title, Content, Form, Item, Input, Label } from 'native-base';

const LoginScreen = ({ navigate }) => {
    return (
        <Container>
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='arrow-back' />
                    </Button>
                </Left>
                <Body>
                    <Title>SIGN IN</Title>
                </Body>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Username</Label>
                            <Input />
                        </Item>
                        <Item floatingLabel last>
                            <Label>Password</Label>
                            <Input />
                        </Item>
                        <Button block info>
                            <Text>SIGN IN</Text>
                        </Button>
                        <Button transparent danger>
                            <Text>SIGN UP</Text>
                        </Button>
                    </Form>
                </Content>

            </Header>

        </Container>
    );
}



export default LoginScreen

const styles = StyleSheet.create({})