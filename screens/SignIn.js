import React, { useState, useEffect } from 'react';
import { View, Alert, TextInput, StyleSheet, Image, ScrollView, ActivityIndicator, Keyboard } from 'react-native';
import { Button, Text } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignIn = ({navigation}) => {

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [keyboardStatus, setKeyboardStatus] = useState(undefined);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
    //   setKeyboardStatus("Keyboard Shown");
    // });
    // const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
    //   setKeyboardStatus("Keyboard Hidden");
    // });
    return () => {
      subscriber; // unsubscribe on unmount
      // showSubscription.remove();
      // hideSubscription.remove();
    }  
  }, []);

  if (initializing) return null;

  const login = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log(`User account signed in!`);
      })
    } catch(error) {
      console.log(error, "error: something wrong");
      Alert.alert('Error', 'Email or Password are Incorreted')
    }
  };

  function isEnableSignIn() {
    return email != "" && password != ""
  }

  function goTo() {
    setTimeout(()=>{
      navigation.navigate('Main')
    }, 3000)
  }

  if (!user) {
    return (
      <KeyboardAwareScrollView
        style={{flex:1}}
      >
        <ScrollView>
          <View style={styles.container}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/Logo-Life-Tracking.png')}
            />
            <View style={styles.item}>
                <View style={styles.iconRow}>
                  <Ionicons name='ios-log-in-outline' style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Email"
                    onChangeText={setEmail}
                    value={email}
                    keyboardType={'email-address'}
                  />
                </View>
            </View>
            <View style={styles.item}>
              <View style={styles.iconRow}>
                <Ionicons name='ios-lock-closed-outline' style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Password"
                  onChangeText={setPassword}
                  value={password}
                  secureTextEntry={true}
                />
              </View>
            </View>
            <Button rounded disabled = {isEnableSignIn() ? false : true} onPress={login} style={styles.buttonAdd}>
              <Text style={styles.content}>Login</Text>
            </Button>           
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>  
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.text}> {user.email} </Text>
      <Image
              style={styles.tinyLogo}
              source={require('../assets/Logo-Life-Tracking.png')}
      />
      <ActivityIndicator size="large"/>
      { goTo() }
    </View>
  );
};

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    paddingTop: 50,
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
    marginTop: 40,
    marginBottom: 10,
  },
  buttonDisable: {
    backgroundColor: 'grey',
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
  tinyLogo: {
    width: 300,
    height: 300,
  },
  title: {
    marginTop: 60,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
});