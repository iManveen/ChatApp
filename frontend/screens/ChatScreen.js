import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../context';
import ChatComponent from '../components/ChatComponent';
import NewGroupModal from '../components/NewGroupModal';
import {socket} from '../utils';

const ChatScreen = () => {
  
  const {
    currentUsers,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
  } = useContext(GlobalContext);
  useEffect(() => {
    socket.emit('getAllGroups');
    socket.on('groupList', groups => {
      setAllChatRooms(groups)
    });
  }, [socket]);


  return (
    <View style={styles.container}>
      <View style={styles.Topcontainer}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome {currentUsers}! </Text>
          <TouchableOpacity>
            <Image
              source={require('../assets/logout.png')}
              style={styles.logoutImg}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer}>
        {allChatRooms && allChatRooms.length > 0 ? (
          <FlatList
            data={allChatRooms}
            renderItem={({item}) => <ChatComponent item={item} />}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.emptyMessage}>No chat rooms available</Text>
        )}
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.buttonGroup}>
          <Text style={styles.buttonText}>Create New Group</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && <NewGroupModal />}

    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  Topcontainer: {
    backgroundColor: '#0084FF',
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutImg: {
    height: 30,
    width: 30,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: '#A9A9A9',
    fontSize: 16,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
  },
  buttonGroup: {
    backgroundColor: '#0084FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
