import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
//import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import {NativeRouter, Link, Route, Switch} from "react-router-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'localstorage-polyfill'; 

import { Drawercontent } from './components/DrawerContent';
import RootStackScreen from './components/RootStack.component';
import { AuthContext } from './components/context';
import HomeScreen from './components/HomeScreen'; 
import Datascreen from './components/DataScreen';
import HistoryScreen from './components/HistoryScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  // const [isloading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ){
      case 'RETRIVE_TOKEN':
        return{
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return{
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return{
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return{
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };               
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: (email, Token) => {
      dispatch({type:'LOGIN', token: Token});
    },
    signOut: () => {
      dispatch({type:'LOGOUT'});
    },
    signUp: () => {
      //TODO
    }
  }));

  useEffect(() => {
    setTimeout(() => {
      dispatch({type:'RETRIVE_TOKEN', token: loginState.userToken});
    }, 1000);
  }, []);

  if( loginState.isLoading ){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value = {authContext}>
      <NavigationContainer>
        {loginState.userToken != null ? (
          <Drawer.Navigator
            drawerContent={props => <Drawercontent{...props}/>}
          >
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="History" component={HistoryScreen}/>
          </Drawer.Navigator>
          )
        :
          <RootStackScreen/>
        }
        
      </NavigationContainer>
    </AuthContext.Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

