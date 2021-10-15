import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import axios from 'axios';

export default function AllUsers(){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        function getRegUsers(){
            console.log(1);
            /*
            axios.get("http://localhost:5000/registeredcustomers/").then((res) => {
                console.log(2);
                alert(JSON.stringify(res.data.name));
            }).catch((err) => {
                console.log(err.message);
            })
             */
            fetch("http://localhost:5000/registeredcustomers/", {method: "GET"}).then((res) => {
                return res.json()
            } 
            ).then((data) => {
                console.log(data);
            }).catch((err) => {
                console.log(err.message);
            }) 
        }
        getRegUsers();
    }, [])
    return(
        <View className="container">
            <Text>All registered users</Text>
        </View>
    )
}