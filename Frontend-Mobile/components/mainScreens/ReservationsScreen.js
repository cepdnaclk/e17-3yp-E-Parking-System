import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, ScrollView, Image, SafeAreaView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, FAB } from 'react-native-paper';
import axios from 'axios';


const CreateButton = () => (
  <FAB
    style={Styles.fab}
    label="Add"
    icon="plus"
    onPress={() => console.log('Pressed')}
  />
);

const MyComponent = () => (
  <Button mode="contained" onPress={() => console.log('Pressed')} style={Styles.button}>
    Cancel
  </Button>
);

const ReservationsScreen = () => {
    return(
        <SafeAreaView style={Styles.container}>
            <ScrollView>
                <Card style={Styles.card}>
                  <Card.Title title="3YP - 4269" subtitle="Toyota Corolla"/>
                  <Card.Content>
                    <Paragraph>Reservation for 4.00pm at ABC Mall</Paragraph>
                    <Title>R1234</Title>
                    <Paragraph> </Paragraph>
                    <Paragraph>Status : Confirmed</Paragraph>
                    <MyComponent />
                  </Card.Content>
                </Card>
                <Card style={Styles.card}>
                  <Card.Title title="3YP - 4269" subtitle="Toyota Corolla"/>
                  <Card.Content>
                    <Paragraph>Reservation for 5.00pm at ABC Mall</Paragraph>
                    <Title>R2341</Title>
                    <Paragraph> </Paragraph>
                    <Paragraph>Status : Pending</Paragraph>
                    <MyComponent />
                  </Card.Content>
                </Card>
                <Card style={Styles.card}>
                  <Card.Title title="3YP - 4269" subtitle="Toyota Corolla"/>
                  <Card.Content>
                    <Paragraph>Reservation for 6.00pm at ABC Mall</Paragraph>
                    <Title>R3333</Title>
                    <Paragraph> </Paragraph>
                    <Paragraph>Status : Confirmed</Paragraph>
                    <MyComponent />
                  </Card.Content>
                </Card>

            </ScrollView>
            <CreateButton />
        </SafeAreaView>
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