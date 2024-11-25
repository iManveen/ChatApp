import React, {useContext, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  Keyboard,
} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {GlobalContext} from '../../context';
import { socket } from '../../utils';

const NewGroupModal = () => {
  const {modalVisible, setModalVisible, currentGroupName, setCurrentGroupName} =
    useContext(GlobalContext);
  const handleCreateNewRoom = () => {
    console.log(currentGroupName);
    socket.emit('createNewGroup',currentGroupName)
    setModalVisible(false)
    setCurrentGroupName('')
    Keyboard.dismiss()
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                autoCorrect={false}
                placeholder="Enter your group name"
                style={styles.loginInput}
                value={currentGroupName}
                onChangeText={value => setCurrentGroupName(value)}
              />
              <Pressable
                onPress={() => handleCreateNewRoom()}
                style={styles.buttonLR}>
                <Text style={styles.buttonText}>Add</Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.buttonLR}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  loginInput: {
    height: 40,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonLR: {
    backgroundColor: '#0084FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default NewGroupModal;
