import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function Datascreen({navigation}){
    // const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     function getRegUsers(){
    //         console.log(1);
            
    //         axios.get("http://192.168.1.100:5000/registeredcustomers/").then((res) => {
    //             console.log(2);
    //             setUsers(res.data);
    //             console.log(res.data.name);
    //         }).catch((err) => {
    //             console.log(err.message);
    //         })
            
    //         // fetch("https://192.168.56.1:5000/registeredcustomers/", {method: "GET"}).then((res) => {
    //         //     return res.json()
    //         // } 
    //         // ).then((data) => {
    //         //     console.log(data);
    //         // }).catch((err) => {
    //         //     console.log(err.message);
    //         // }) 
    //     }
    //     getRegUsers();
    // }, [])
    return(
        <View style={Styles.container}>
            <Text>Data Screen</Text>
            {/* <Button 
                title="Home Screen" 
                onPress={() => navigation.navigate("Homescreen")}
            /> */}
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'        
    },
});