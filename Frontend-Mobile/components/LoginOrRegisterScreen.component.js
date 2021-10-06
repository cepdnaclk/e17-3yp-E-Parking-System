import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView } from 'react-native';
import { Provider, Portal, Modal, Avatar, TextInput, Button, IconButton, Card, Title, Paragraph, FAB, RadioButton } from 'react-native-paper';


const LoginRegisterScreen = () => {
  
    return (
      <SafeAreaView style={Styles.container} >
        <Title style={Styles.header}>Enter Details</Title>
        <View style={Styles.container} >

          <Text style={Styles.text}>Name</Text>
          <TextInput label='Enter name' dense={true}/>
          <Text style={Styles.text}>Email</Text>
          <TextInput label='Enter email' dense={true}/>
          <Text style={Styles.text}>Contact</Text>
          <TextInput label='Enter contact number' dense={true}/>
          <Text style={Styles.text}>Password</Text>
          <TextInput label='Enter password' dense={true}/>
          <Text style={Styles.text}>Payment method</Text>
          
          <View style={{alignItems:'flex-start'}} >
            <Button mode="contained" color="#ebebeb" >Add Card</Button>
          </View>
         

        </View>
        <View style={Styles.button} >
          <Button mode="contained" color="#1f1f1f" onPress={() => console.log("User is registered")}>Register</Button>
        </View>
      </SafeAreaView>
    );
    
  };

  export default LoginRegisterScreen;

  const Styles = StyleSheet.create({
    container:{
      flex: 1, 
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 30,
    },
    header:{
      marginTop: 50,
      marginLeft: 120,
    },
    card: {
      margin: 10,
      flex: 1,
    },
    text: {
      marginTop: 20,
      marginBottom: 5,
    },
    button: {
      marginLeft: 10,
      marginRight: 10,
    },
  });