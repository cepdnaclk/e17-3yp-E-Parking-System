import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import {NativeRouter, Link, Route} from "react-router-native";

// Routing
import AllUsers from './components/AllUsers.component';


export default function App() {
  return (
    <NativeRouter>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link to="/add" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Registration</Text>
        </Link>
        <Link to="/Login" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>Login</Text>
        </Link>
        <Link to="/all" underlayColor="#f0f4f7" style={styles.navItem}>
          <Text>All users</Text>
        </Link>
      </View>
    
      <Route path="/all" exact component={AllUsers} />
    </View>
  </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  }
});

