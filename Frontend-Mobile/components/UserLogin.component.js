import React, {useState, useEffect} from 'react';
import { StyleSheet,Label, TextInput, TouchableOpacity, Platform, Text, View, Button, Image, StatusBar, Alert, SafeAreaView } from 'react-native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';
//import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import { AuthContext } from './context';



export default function Login({ history, navigation }){

    const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { signIn } = React.useContext(AuthContext);

    const { colors } = useTheme();

    const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            console.log(2);
            //history.push("/private");
        }
    }, [history]);

    async function loginData(e) {
        e.preventDefault();


        try{

            const email = data.email;
            const password = data.password;
            console.log(email,password);
            const userdata = await axios.post("http://192.168.1.101:5000/registeredcustomers/signin", {email, password});
            console.log(userdata.data["token"]);
            localStorage.setItem("authToken", userdata.data["token"]);
            console.log(3);
            signIn(email, userdata.data["token"]);

            //history.push("/private");
        }catch(error){
            console.log(1);
            console.log(error.message);
        }

    }

    return(
        <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
      <View style={styles.header}>
          <Text style={styles.text_header}>Welcome!</Text>
      </View>

      <Animatable.View 
          animation="fadeInUpBig"
          style={[styles.footer, {
              backgroundColor: colors.background
          }]}
      >
          <Text style={[styles.text_footer, {
              color: colors.text
          }]}>Email</Text>
          <View style={styles.action}>
              <FontAwesome 
                  name="user-o"
                  color={colors.text}
                  size={20}
              />
              <TextInput 
                  placeholder="Your Email"
                  placeholderTextColor="#666666"
                  style={[styles.textInput, {
                      color: colors.text
                  }]}
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange(val)}
                  onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
              />
              {data.check_textInputChange ? 
              <Animatable.View
                  animation="bounceIn"
              >
                  <Feather 
                      name="check-circle"
                      color="green"
                      size={20}
                  />
              </Animatable.View>
              : null}
          </View>

          { data.isValidUser ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Invalid Email</Text>
          </Animatable.View>
          }
          

          <Text style={[styles.text_footer, {
              color: colors.text,
              marginTop: 35
          }]}>Password</Text>
          <View style={styles.action}>
              <Feather 
                  name="lock"
                  color={colors.text}
                  size={20}
              />
              <TextInput 
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={[styles.textInput, {
                      color: colors.text
                  }]}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
              />
              <TouchableOpacity
                  onPress={updateSecureTextEntry}
              >
                  {data.secureTextEntry ? 
                  <Feather 
                      name="eye-off"
                      color="grey"
                      size={20}
                  />
                  :
                  <Feather 
                      name="eye"
                      color="grey"
                      size={20}
                  />
                  }
              </TouchableOpacity>
          </View>

          { data.isValidPassword ? null : 
          <Animatable.View animation="fadeInLeft" duration={500}>
          <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
          </Animatable.View>
          }
          

          <TouchableOpacity>
              <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
              <TouchableOpacity
                  style={styles.signIn}
                  onPress={loginData}
              >
              <LinearGradient
                  colors={['#08d4c4', '#01ab9d']}
                  style={styles.signIn}
              >
                  <Text style={[styles.textSign, {
                      color:'#fff'
                  }]}>Sign In</Text>
              </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={() => navigation.navigate('Test')}
                  style={[styles.signIn, {
                      borderColor: '#009387',
                      borderWidth: 1,
                      marginTop: 15
                  }]}
              >
                  <Text style={[styles.textSign, {
                      color: '#009387'
                  }]}>Create Account</Text>
              </TouchableOpacity>
          </View>
      </Animatable.View>
    </View>       
        // <View style={{margin:20}}>
        //     <TextInput
        //         placeholder="Enter email"
        //         onChangeText={text => setEmail(text)}
        //         // onChange={(e) => {setEmail(e.target.value);}}
        //     />

        //     <TextInput
        //         placeholder="Password"
        //         onChangeText={text => setPassword(text)}
        //         // onChange={(e) => {
        //         //     setPassword(e.target.value);
        //         // }}
        //     />

        //     <Button title="Submit" onPress={loginData}><Text>Submit</Text></Button>

        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });

