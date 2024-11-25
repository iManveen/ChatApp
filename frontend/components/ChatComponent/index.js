import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../../context';

const ChatComponent = ({item}) => {
  const {messages, setMessages} = useContext(GlobalContext);

  useEffect(() => {
    setMessages(item.messages[item.messages.length - 1]);
  }, [item.messages]);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.message}>
          {messages?.text ? messages.text : 'Tap to start messaging'}
        </Text>
      </View>
      <View>
        <Text style={styles.messageTime}>
          {messages?.time ? messages.time : 'Now'}
        </Text>
      </View>
    </View>
  );
};

export default ChatComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#7A7A7A',
  },
  messageTime: {
    fontSize: 12,
    color: '#A9A9A9',
  },
});
