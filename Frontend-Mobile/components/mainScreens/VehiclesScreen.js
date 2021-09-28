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

const VehiclesScreen = () => {
  return (
    <SafeAreaView style={Styles.container} >
      <ScrollView>
      
        <Card style={Styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Title title="3YP - 4269" subtitle="Toyota Corolla" />
        </Card><Card style={Styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Title title="3YP - 4269" subtitle="Toyota Corolla" />
        </Card><Card style={Styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Title title="3YP - 4269" subtitle="Toyota Corolla" />
        </Card><Card style={Styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Title title="3YP - 4269" subtitle="Toyota Corolla" />
        </Card><Card style={Styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Title title="3YP - 4269" subtitle="Toyota Corolla" />
        </Card><Card style={Styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Title title="3YP - 4269" subtitle="Toyota Corolla" />
        </Card><Card style={Styles.card}>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
          <Card.Title title="3YP - 4269" subtitle="Toyota Corolla" />
        </Card>
      </ScrollView>
      <CreateButton />
    </SafeAreaView>
  );
};

export { VehiclesScreen };

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'        
    },
    card: {
      margin: 10,
    },
    fab: {
      backgroundColor: '#01d28e',
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
    },
});