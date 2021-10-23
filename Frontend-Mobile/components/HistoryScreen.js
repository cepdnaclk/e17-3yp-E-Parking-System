import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

export default function HistoryScreen({navigation}){
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getRegUsers(){
            
            let result = await SecureStore.getItemAsync("Token");
            const config = {
                headers: {
                    authorization: `bearer ${result}`
                }
            }

            axios.get("https://quickpark.tk/api/registeredcustomers/user", config).then((res) => {
                console.log(res.data.name);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getRegUsers();
    }, [])
    return(
        <View style={Styles.container}>
            <Text>History Screen</Text>
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