import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MessageComponent = ({currentUsers, item}) => {
  // Assuming currentUsers is an object with id property (you might need to adjust this)
  const currentUserStatus = item.currentUsers !== currentUsers.id;

  // Check if the message text is empty
  if (!item.text.trim()) {
    return null; // Do not render the message if text is empty
  }

  return (
    <View
      style={[
        styles.messageContainer,
        currentUserStatus ? styles.left : styles.right,
      ]}>
      <View style={styles.messageBubble}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );
};

export default MessageComponent;

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  left: {
    alignItems: 'flex-start',

  },
  right: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 50,
  },
  timeText: {
    fontSize: 12,
    color: 'black',
    marginTop: 5,
    fontWeight:600,
  },
  messageText:{
    color:"black",
    fontWeight:700
  }
});