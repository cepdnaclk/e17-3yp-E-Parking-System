import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const ParkScreen = () => {

  useEffect(() => {
    async function getRegUsers(){
        
        let result = await SecureStore.getItemAsync("Token");
        const config = {
            headers: {
                authorization: `bearer ${result}`
            }
        }

        axios.get("http://192.168.1.101:5000/registeredcustomers/user", config).then((res) => {
            console.log(res.data.name);
        }).catch((err) => {
            alert(err.message);
        })
    }
    getRegUsers();
}, [])


  return (
    <SafeAreaView style={Styles.container} >
      <View style={Styles.container} >
        <Card style={Styles.card}>
          <Card.Title title="3YP - 4269" subtitle="Toyota Corolla" />
          <Card.Content style={Styles.cardTop} >
            <Paragraph>5.00pm - Check-in at ABC Mall</Paragraph>
            <Paragraph />
            <Paragraph style={Styles.spotContext}>Spot Number</Paragraph>
            <Title style={Styles.spotNo} >A001</Title>
          </Card.Content>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={Styles.directions} />
        </Card>
      </View>
    </SafeAreaView>
  );
};

export { ParkScreen };

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'        
    },
    card: {
      margin: 10,
      flex: 1,
    },
    cardTop: {
      paddingBottom: 15,
    },
    fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 0,
    },
    directions: {
      flex: 1,
    },
    spotContext: {
      color:'#888', 
      fontSize: 12,
    },
    spotNo: {
      fontSize: 26
    },
});