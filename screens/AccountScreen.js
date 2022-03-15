import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Button } from 'native-base';

import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountScreen = ({ navigation }) => {

  const user = auth().currentUser;

  const logout = () => {
    auth().signOut().then(()=> console.log('User signed out!'));
    navigation.replace('Signin');
  }

  return (
    <View style={styles.container}>
        <Image
              style={styles.tinyLogo}
              source={require('../assets/Logo-Life-Tracking.png')}
        />
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.text}> {user.email} </Text>
        <Button onPress={logout} style={styles.buttonOut}>
          <Ionicons name="log-out-outline" style={styles.icon} />
          <Text style={styles.content}>Logout</Text>
        </Button>
    </View>
  )
}
  
export default AccountScreen

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
  icon: {
    color: "#fcf7f7",
    fontSize: 24,
  },
  buttonOut: {
    height: 40,
    width: 250,
    color: "#fcf7f7",
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
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
});