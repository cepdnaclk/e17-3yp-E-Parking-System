import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen.component';
import RegisterScreen from './RegisterScreen.component';
import Login from './UserLogin.component';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator screenOptions={{ headerShown: false}}>
        <RootStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
        <RootStack.Screen name="Registration" component={RegisterScreen}/>
        <RootStack.Screen name="Login" component={Login}/>
    </RootStack.Navigator>
);

export default RootStackScreen;