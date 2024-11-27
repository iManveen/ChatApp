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

const ChatScreen = ({navigation, item}) => {
  const {
    currentUsers,
    allChatRooms,
    setAllChatRooms,
    modalVisible,
    setModalVisible,
    setCurrentUsers,
    setShowLoginView,
  } = useContext(GlobalContext);
  useEffect(() => {
    console.log('heyyyyy');

    socket.emit('getAllGroups');
    socket.on('groupList', groups => {
      console.log('Recieved groups', groups);
      setAllChatRooms(groups);
    });
  }, [socket]);
  const handleNavigateToMessageScreen = item => {
    navigation.navigate('MessageScreen', {
      currentGroupName: item.currentGroupName,
      currentGroupId: item.id,
    });
  };
  const handleLogout = () => {
    setCurrentUsers('');
    setShowLoginView(false)
  };
  useEffect(()=>{
    if(currentUsers.trim()===''){
      navigation.navigate('HomeScreen')
    }




  },[currentUsers])

  return (
    <View style={styles.container}>
      <View style={styles.Topcontainer}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome {currentUsers}! </Text>
          <TouchableOpacity onPress={() => handleLogout()}>
            <Image
              source={require('../assets/logout.png')}
              style={styles.logoutImg}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.listContainer}>
        {allChatRooms && allChatRooms.length > 0 ? (
          <FlatList
            data={allChatRooms}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => handleNavigateToMessageScreen(item)}>
                {' '}
                <ChatComponent item={item} />{' '}
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          (console.log('Fallback:', allChatRooms),
          (<Text style={styles.emptyMessage}>No chat rooms available</Text>))
        )}
      </TouchableOpacity>

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
    backgroundColor: 'green',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    color: 'black',
    fontSize: 16,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'red',
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
