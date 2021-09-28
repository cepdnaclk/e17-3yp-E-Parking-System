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
//    // const [error, setError] = useState("");
//     const [name, setName] = useState("");

//     useEffect(() => {
//         if(!localStorage.getItem("authToken")){
//             history.push("/login")
//         }

//         const fetchPrivateData = async() => {
//             const config = {
//                 headers: {
//                     authorization: `bearer ${localStorage.getItem("authToken")}`
//                 }
//             }

//             axios.get("http://192.168.1.100:5000/registeredcustomers/user", config).then((res) => {
//                 setName(res.data.name);
//                 console.log("Hi");
//                 console.log(res.data.name);
//             }).catch((err) => {
//                 alert(err.message);
//             })
//             /*
//             try{
//                 axios.get("http://localhost:5000/registeredcustomers/user", config);
//                 console.log(data.data);
//                 if(!privatedata){
//                     alert("kela wela react");
//                 }
//                 alert(privatedata);
    
//             }catch(error){
//                 localStorage.removeItem("authToken");
                
//             }
//             */
//         };
//         fetchPrivateData();
//     },[history, setName]);

    // const logOutHandler = () => {
    //     localStorage.removeItem("authToken");
    //     history.push("/login");
    // }


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


