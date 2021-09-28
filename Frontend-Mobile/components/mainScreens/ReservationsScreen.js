import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native';
import axios from 'axios';

const ReservationsScreen = () => {
    return(
        <View style={Styles.container}>
            <Text>Reservations Screen</Text>
            {/* <Button 
                title="Home Screen" 
                onPress={() => navigation.navigate("Homescreen")}
            /> */}
        </View>
    );
};

export { ReservationsScreen };

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'        
    },
});