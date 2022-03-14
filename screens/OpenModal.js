import React, {useEffect, useState} from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import RecordForm from './RecordForm';

const OpenModal = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
      <SafeAreaView>
            <Modal visible={modalOpen} animationType="slide">
            <View style={styles.modalContent}>
                <TouchableOpacity onPress={() => setModalOpen(false)}>
                    <Ionicons name="ios-close-sharp" size={24} color={'#f50d05'} style={{...styles.modalToggle, ...styles.modalClose}} />
                </TouchableOpacity>
                {/* Render RecordForm */}
                <RecordForm />
                {/* Render RecordForm */}
            </View>
            </Modal>
        {/* <TouchableOpacity onPress={() => setModalOpen(false)}>
            <Ionicons name="ios-add-circle" size={60} color={'#23b4f7'} style={{...styles.modalToggle}} />
        </TouchableOpacity> */}
       </SafeAreaView>
    );
}

export default OpenModal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  itemHeader: {
    backgroundColor: '#23b4f7',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#23b4f7',
    padding: 10,
    marginVertical: 1,
    marginHorizontal: 16,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    color: 'white',
  },
  content: {
    fontSize: 18,
    color: 'white',
    marginLeft: 30,
  },
  dateTitle: {
    fontSize: 18,
    color: 'white',
  },
  date: {
    fontSize: 14,
    color: 'white',
  },
  cost: {
    fontSize: 22,
    color: 'white',
    marginLeft: 150,
    marginRight: 20,
    alignSelf: 'center',
  },
  icon: {
    color: 'white',
    marginLeft: 15,
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});