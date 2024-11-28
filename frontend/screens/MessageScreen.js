import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../context';
import MessageComponent from '../components/MessageComponent';
import {socket} from '../utils';

const MessageScreen = ({navigation, route}) => {
  const {currentGroupName, currentGroupId} = route.params;
  const {
    allChatMessages,
    setAllChatMessages,
    currentUsers,
    currentChatMessage,
    setCurrentChatMessage,
  } = useContext(GlobalContext);

  const handleAddNewMessage = () => {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    };
    if (currentUsers) {
      socket.emit('newChatMessage', {
        currentChatMessage,
        groupIdentifier: currentGroupId,
        currentUsers,
        timeData,
      });
      setCurrentChatMessage('');
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    socket.emit('findGroup', currentGroupId);
    socket.on('foundGroup', allChats => setAllChatMessages(allChats));
  }, [socket]);

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.innerWrapper}>
        {allChatMessages && allChatMessages[0] ? (
          <FlatList
            data={allChatMessages}
            renderItem={({item}) => (
              <View>
                <MessageComponent item={item} currentUsers={currentUsers} />
              </View>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          ''
        )}
      </ScrollView>

      <View style={styles.messageInputContainerWrapper}>
        <View style={styles.messageInputContainer}>
          <TextInput
            style={styles.messageInput}
            value={currentChatMessage}
            onChangeText={setCurrentChatMessage}
            placeholder="Enter your message"
          />
        </View>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleAddNewMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center', 
  
  },
  innerWrapper: {
    flex: 1,
    padding: 16,
   
  },
  messageInputContainerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center', 
    position: 'absolute',
    bottom: 50, 
    zIndex: 1,
    padding: 10,

 
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 10,
    height: 45,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  messageInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#0084FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginLeft: 10,
    shadowColor: '#0084FF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
