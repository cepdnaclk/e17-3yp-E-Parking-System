import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet,Label, TextInput, Text, View, Button, Image, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ParkScreen } from "./mainScreens/ParkScreen";
import { VehiclesScreen } from "./mainScreens/VehiclesScreen";
import { ReservationsScreen } from "./mainScreens/ReservationsScreen";

const Tab = createMaterialBottomTabNavigator();

 function MainScreen () {
  return (
    <Tab.Navigator
      initialRouteName="Park"
      barStyle={{ backgroundColor: '#1f1f1f' }}
    >
      <Tab.Screen 
        name="Park"
        component={ParkScreen}
        options={{
          tabBarLabel: 'Park',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Vehicles"
        component={VehiclesScreen}
        options={{
          tabBarLabel: 'Vehicles',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="car" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Reservations"
        component={ReservationsScreen}
        options={{
          tabBarLabel: 'Reserve',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="receipt" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeScreen = ({history, navigation}) => {

    return(
        <MainScreen />
    );
};

export default HomeScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'        
    },
});


