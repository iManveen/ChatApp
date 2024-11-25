import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import MessageScreen from './screens/MessageScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import GlobalState from './context';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="MessageScreen"
            component={MessageScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar hidden={true}/>
    </GlobalState>
  );
};

export default App;

const styles = StyleSheet.create({});
