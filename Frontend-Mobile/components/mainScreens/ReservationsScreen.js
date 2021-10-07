import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import { Provider, Portal, Button, Banner, TextInput, Divider, Avatar, IconButton, Card, Title, Paragraph, FAB } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import axios from 'axios';


const ReservationsScreen = () => {
  
  const [bannerVisible, setBannerVisible] = React.useState(true);
  
  
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
  
  
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  
  const onDismiss = React.useCallback(() => {
    setVisible(false)
  }, [setVisible])

  const onConfirm = React.useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      console.log({ hours, minutes });
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