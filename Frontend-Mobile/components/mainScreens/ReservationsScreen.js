import React, {useState, useEffect} from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Provider, Banner, IconButton, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import * as SecureStore from 'expo-secure-store';
import EventSource from "react-native-sse";
import axios from 'axios';


const ReservationsScreen = () => {

  const [Ruser, setRuser] = React.useState({});
  const [bannerVisible, setBannerVisible] = React.useState(true);  
  const [registrationInfo, setRegistrationInfo] = useState([]);
  const [visible, setVisible] = React.useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [add, setAdd] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(() => {

    async function getRegUsers(){
      let result = await SecureStore.getItemAsync("Token");
      const config = {
          headers: {
              authorization: `bearer ${result}`
          }
      }  

        try{
          const userdetails = await axios.get(`http://${window.IP}/registeredcustomers/user`, config);
          setRuser(userdetails.data['_id']);
          try{
            const getreservationsFromID = await axios.get(`http://${window.IP}/reservation/${userdetails.data['_id']}`, config);
            setRegistrationInfo(getreservationsFromID.data);
          }catch(error){
            console.log(error);
          }
        }
        catch(error){
          console.log(error);
        }

    };
    async function onConfirmfire(){

      let result = await SecureStore.getItemAsync("Token");
      const config = {
          headers: {
              authorization: `bearer ${result}`
          }
      }  ;

      if(add){          
        try{
          const reservationID = await axios.post(`http://${window.IP}/reservation/add`,{ hours, minutes, Ruser});
          try{
            const getreservationsFromID = await axios.get(`http://${window.IP}/reservation/${Ruser}`, config);
            setRegistrationInfo(getreservationsFromID.data);
            setAdd(false);
            try{
              const reservationid = reservationID.data['_id'];
              var eventSource = new EventSource(`http://${window.IP}/reservation/test/${reservationid}`, config);
              eventSource.addEventListener("open", (e) => {
                console.log("Open SSE connection");
              });
              eventSource.addEventListener("message", (e) => {
                let info = JSON.parse(e["data"]);
                setConfirmation(true);            
                eventSource.close();
                            
              });
            }catch(error){

            }
          }catch(error){
            console.log(error);
          }
        }catch(error){
          console.log(error);
        }
      }
      
      setConfirmation(false);
    };
    
    getRegUsers();
    onConfirmfire();
}, [add, confirmation])
  
  
  const InfoBanner = () => {
    return (
      <Banner
        visible={bannerVisible}
        actions={[
          {
            label: 'Got it',
            onPress: () => setBannerVisible(false),
          },
        ]}
      >
        Reservations have to be on the same day and at least one hour in advance.
      </Banner>
    );
  }
  
  
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setHours(hours);
      setMinutes(minutes);
      setAdd(true);
      setVisible(false);
    },
    [setVisible]
  );
  
  
  const CreateButton = () => (
    <FAB
      style={Styles.fab}
      label="Add"
      icon="plus"
      onPress={showModal}
    />
  );
  
  const AddReservation = () => {
    return (
      <TimePickerModal
        visible={visible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
        animationType="fade" // optional, default is 'none'
      />
    );
  };
  
  return(
    <Provider>
      <SafeAreaView style={Styles.container}>
          <InfoBanner />
          <AddReservation />
          <ScrollView>
            {registrationInfo.map((reginfo, index) => (
              <Card style={Styles.card} key={Math.random().toString(36).substr(2, 9)}>
                <Card.Title
                  key={Math.random().toString(36).substr(2, 9)}
                  title="Reservation ID" subtitle={reginfo['_id']}
                  right= {() => (
                      <IconButton onPress={() => console.log('Delete')} icon="delete" color='#1f1f1f' size={20} />
                  )}
                />
                <Card.Content>
                  <Paragraph>Reservation for {reginfo['dateandtime']} at ABC Mall</Paragraph>
                  <Title>status: {reginfo['status']}</Title>
                  <Paragraph />
                <Paragraph>{reginfo['parkingspotID']}</Paragraph>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
          <CreateButton />
      </SafeAreaView>
    </Provider>
  );
  
  
  
};

export { ReservationsScreen };

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'        
    },
    fab: {
      backgroundColor: '#01d28e',
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
    },
    card: {
      margin: 10,
    },
    button: {
      backgroundColor: '#1f1f1f',
      marginTop: 25,
    },
});