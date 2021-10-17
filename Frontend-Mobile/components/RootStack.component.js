import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen.component';
import LoginRegisterScreen from './LoginOrRegisterScreen.component';
import Login from './UserLogin.component';
// import SignInScreen from './SignInScreen';
// import SignUpScreen from './SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='false'>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        <RootStack.Screen name="Test" component={LoginRegisterScreen}/>
        <RootStack.Screen name="Login" component={Login}/>
        {/* <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/> */}
    </RootStack.Navigator>
);

export default RootStackScreen;