import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { StyleSheet,Label, TextInput, Text, View, Button, Image, SafeAreaView } from 'react-native';

const HomeScreen = ({history, navigation}) => {
//    // const [error, setError] = useState("");
//     const [name, setName] = useState("");

//     useEffect(() => {
//         if(!localStorage.getItem("authToken")){
//             history.push("/login")
//         }

//         const fetchPrivateData = async() => {
//             const config = {
//                 headers: {
//                     authorization: `bearer ${localStorage.getItem("authToken")}`
//                 }
//             }

//             axios.get("http://192.168.1.100:5000/registeredcustomers/user", config).then((res) => {
//                 setName(res.data.name);
//                 console.log("Hi");
//                 console.log(res.data.name);
//             }).catch((err) => {
//                 alert(err.message);
//             })
//             /*
//             try{
//                 axios.get("http://localhost:5000/registeredcustomers/user", config);
//                 console.log(data.data);
//                 if(!privatedata){
//                     alert("kela wela react");
//                 }
//                 alert(privatedata);
    
//             }catch(error){
//                 localStorage.removeItem("authToken");
                
//             }
//             */
//         };
//         fetchPrivateData();
//     },[history, setName]);

    // const logOutHandler = () => {
    //     localStorage.removeItem("authToken");
    //     history.push("/login");
    // }


    return(
        <View style={Styles.container}>
            <Text>Home Screen</Text>
            {/* <Button 
                title="Data Screen" 
                onPress={() => navigation.navigate("Datascreen")}
            /> */}
        </View>
    );
};

export default HomeScreen;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'        
    },
});


