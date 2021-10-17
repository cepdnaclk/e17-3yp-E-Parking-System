import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import EventSource from "react-native-sse";

const ParkScreen = () => {

  const [user, setuser] = useState({});
  const [assignedInfo, setAssignedInfo] = useState({});
  const [vehiclemodelindex, setindex] = useState();
  const [Listening, setListening] = useState(false);

  useEffect(() => {

    async function getRegUsers(){
        
        let result = await SecureStore.getItemAsync("Token");
        const config = {
            headers: {
                authorization: `bearer ${result}`
            }
        }

        axios.get("http://192.168.1.102:5000/registeredcustomers/user", config).then((res) => {
            setuser(res.data);

            if(!Listening){
              var eventSource = new EventSource(`http://192.168.1.102:5000/assignto/${res.data["_id"]}`);
              eventSource.addEventListener("open", (e) => {
                console.log("Open SSE connection");
              });
              eventSource.addEventListener("message", (e) => {
                let info = JSON.parse(e["data"]);
                setAssignedInfo(info);
                console.log(info);
                eventSource.close();            
              });
            }

          }).catch((err) => {
            alert(err.message);
        });

        setListening(true);

    }
    getRegUsers();
}, [Listening])

  return (
    <SafeAreaView style={Styles.container} >
      <View style={Styles.container} >
        <Card style={Styles.card}>
          <Card.Title title={assignedInfo["vehiclenumber"]} subtitle="(Toyota Corolla)have to change" />
          <Card.Content style={Styles.cardTop} >
            <Paragraph>{assignedInfo["checkin"]} - Check-in at ABC Mall</Paragraph>
            <Paragraph />
            <Paragraph style={Styles.spotContext}>Spot Number</Paragraph>
            <Title style={Styles.spotNo} >{assignedInfo["parkingspotID"]}</Title>
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