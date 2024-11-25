import {
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {GlobalContext} from '../context';

const HomeScreen = ({navigation}) => {
  const {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    allUsers,
    setAllUsers,
    currentUsers,
    setCurrentUsers,
  } = useContext(GlobalContext);

  const handleRegisterLogin = isLogin => {
    if (currentUserName.trim() !== '') {
      const index = allUsers.findIndex(
        userItem => userItem === currentUserName,
      );

      if (isLogin) {
        if (index === -1) {
          Alert.alert('Please register first');
        } else {
          setCurrentUsers(currentUserName);
          // Navigate to the Chat screen
          navigation.navigate('ChatScreen', {userName: currentUserName});
        }
      } else {
        if (index === -1) {
          allUsers.push(currentUserName);
          setAllUsers(allUsers);
          setCurrentUsers(currentUserName);
          // Navigate to the Chat screen after registration
          navigation.navigate('ChatScreen', {userName: currentUserName});
        } else {
          Alert.alert('User already registered');
        }
      }
      setCurrentUserName('');
    } else {
      Alert.alert('User name field is empty');
    }

    Keyboard.dismiss();
  };
  console.log(allUsers,currentUsers);
  useEffect(() => {
    if(currentUsers!=='')
    navigation.navigate('ChatScreen');
  }, [currentUsers]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/chatting.jpg')}
        style={styles.chattingImage}
        resizeMode="cover">
        <View style={styles.overlay}>
          <View style={styles.content}>
            {showLoginView ? (
              <View style={styles.loginForm}>
                <Text style={styles.headerText}>Enter Your User Name</Text>
                <TextInput
                  autoCorrect={false}
                  placeholder="Enter your user name"
                  style={styles.loginInput}
                  value={currentUserName}
                  onChangeText={value => setCurrentUserName(value)}
                />
                <View style={styles.buttonContainer}>
                  <Pressable
                    onPress={() => handleRegisterLogin(false)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleRegisterLogin(true)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <View style={styles.infoBlock}>
                <Text style={styles.mainText}>Connect, Grow and Inspire</Text>
                <Text style={styles.subText}>
                  Connect people around the world for free.
                </Text>
                <TouchableOpacity
                  onPress={() => setShowLoginView(true)}
                  style={styles.getStartedButton}>
                  <Text style={styles.getStartedText}>Get Started</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chattingImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  loginForm: {
    width: '100%',
  },
  loginInput: {
    height: 40,
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  button: {
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
  infoBlock: {
    alignItems: 'center',
  },
  mainText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  getStartedButton: {
    backgroundColor: '#0084FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
