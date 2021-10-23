import React, {useState, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import EventSource from "react-native-sse";

const ParkScreen = () => {

  const [assignedInfo, setAssignedInfo] = useState({});
  const [Listening, setListening] = useState(false);

  function getImage(input) {
    switch (input) {
      case "A005": return require('./mapping/A005.png');
      case "A006": return require('./mapping/A006.png');

    }
  }


  useEffect(() => {

    async function getRegUsers(){
        
        let result = await SecureStore.getItemAsync("Token");
        const config = {
            headers: {
                authorization: `bearer ${result}`
            }
        }
        axios.get("https://quickpark.tk/api/registeredcustomers/user", config).then((res) => {
            if(!Listening){
              var eventSource = new EventSource(`https://quickpark.tk/api/assignto/${res.data["_id"]}`, config);
              eventSource.addEventListener("open", (e) => {
                console.log("Open SSE connection");
              });
              eventSource.addEventListener("message", (e) => {
                let info = JSON.parse(e["data"]);
                setAssignedInfo(info);
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
          <Card.Title title="Parking Info" />
          <Card.Content style={Styles.cardTop} >
            <Paragraph style={Styles.spotContext}>Vehicle Number</Paragraph>
            <Title style={Styles.spotNo} >{assignedInfo["vehiclenumber"]}</Title>
            <Paragraph style={Styles.spotContext}>Spot Number</Paragraph>
            <Title style={Styles.spotNo} >{assignedInfo["parkingspotID"]}</Title>
            <Paragraph>{assignedInfo["checkin"]} - Check-in at ABC Mall</Paragraph>
            <Paragraph />
          </Card.Content>

            <Card.Cover source={getImage(assignedInfo["parkingspotID"])} style={Styles.directions} />
          
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