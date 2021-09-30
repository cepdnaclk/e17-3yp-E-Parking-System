import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import { Provider, Modal, Portal, Button, TextInput, Divider, Avatar, IconButton, Card, Title, Paragraph, FAB } from 'react-native-paper';
import axios from 'axios';

//import { TimePickerPage } from '../TimePicker.component';


const ReservationsScreen = () => {
  
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20 };
  
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
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Title>Add a reservation</Title>
          
          <Divider style={{marginBottom: 20}} />
          
          <Text style={{marginBottom: 20}} >Select a time for your reservation</Text>
          
          <TextInput
            mode='outlined'
            label="Reservation Time"
            dense={true}
          />
          
          <Divider style={{marginBottom: 20}} />
          
          <Button onPress={() => console.log("Reservation Added")}>Add Reservation</Button>
        </Modal>
      </Portal>
    );
  };
  
  return(
    <Provider>
      <SafeAreaView style={Styles.container}>
          <AddReservation />
          <ScrollView>
          
            <Card style={Styles.card}>
              <Card.Title
                title="3YP - 4269" subtitle="Toyota Corolla"
                right= {() => (
                    <IconButton onPress={() => console.log('Delete')} icon="delete" color='#1f1f1f' size={20} />
                )}
              />
              <Card.Content>
                <Paragraph>Reservation for 4.00pm at ABC Mall</Paragraph>
                <Title>R1234</Title>
                <Paragraph />
                <Paragraph>Status : Confirmed</Paragraph>
              </Card.Content>
            </Card>

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