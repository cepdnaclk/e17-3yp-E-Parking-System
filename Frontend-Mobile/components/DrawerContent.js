import React, {useState, useEffect, useContext} from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { StyleSheet, View, Image, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import {
    Avatar,
    Title,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from "./context";

export function Drawercontent(props) {

    const [name, setName] = useState("");

    useEffect(() => {
        async function getname(){

            let result = await SecureStore.getItemAsync("Token");
            const config = {
                headers: {
                    authorization: `bearer ${result}`
                }
            }
            axios.get(`${window.IP}/registeredcustomers/user`, config).then((res) => {
                setName(res.data["name"]);
            }).catch((err) => {
                alert(err);
            })
        }
        getname();
    }, [])

    const { signOut } = useContext(AuthContext);
    
    return(
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection: 'row', marginTop: 25, marginBottom: 10}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://www.pngfind.com/mpng/hiJwTJo_icon-user-icon-hd-png-download/' 
                                }}
                                style={{backgroundColor: '#ddd'}}
                                size={75}
                            />
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 6}}>
                            <Title style={styles.title}>{name}</Title>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                        icon={({color, size}) => (
                            <Icon
                            name="home-outline"
                            color={color}
                            size={size}
                            />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />   
                        <DrawerItem
                        icon={({color, size}) => (
                            <Icon
                            name="history"
                            color={color}
                            size={size}
                            />
                            )}
                            label="History"
                            onPress={() => {props.navigation.navigate('History')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                        <Icon
                        name="exit-to-app"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />

            </Drawer.Section> 
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        height: 150,
        backgroundColor: '#1f1f1f',
    },
    title: {
        fontSize: 20,
        color: '#fff',
        marginTop: 3,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,        
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});