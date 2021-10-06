import React, {useEffect} from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
//import { AsyncStorage } from 'react-native';
import 'localstorage-polyfill'; 

import { Drawercontent } from './components/DrawerContent';
import RootStackScreen from './components/RootStack.component';
import { AuthContext } from './components/context';
import HomeScreen from './components/HomeScreen'; 
import Datascreen from './components/DataScreen';
import HistoryScreen from './components/HistoryScreen';


/* Localization settings for TimePicker component */
// on top of your index.android.js file
const isAndroid = require('react-native').Platform.OS === 'android'; // this line is only needed if you don't use an .android.js file
const isHermesEnabled = !!global.HermesInternal;  // this line is only needed if you don't use an .android.js file

// in your index.js file
if (isHermesEnabled || isAndroid) {  // this line is only needed if you don't use an .android.js file

  require('@formatjs/intl-getcanonicallocales/polyfill');
  require('@formatjs/intl-locale/polyfill');


  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-listformat/polyfill');
  require('@formatjs/intl-listformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-numberformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-datetimeformat/add-golden-tz.js');



  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone

  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {

    // If you are using react-native-cli
    //let RNLocalize = require('react-native-localize');
    //Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());

    //  Are you using Expo, use this instead of previous 2 lines
    Intl.DateTimeFormat.__setDefaultTimeZone(
      require("expo-localization").timezone
    );
  }
} // this line is only needed if you don't use an .android.js file






const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  // const [isloading, setIsLoading] = React.useState(true);
  // const [userToken, setUserToken] = React.useState(null);

  initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ){
      case 'RETRIVE_TOKEN':
        return{
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return{
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return{
          ...prevState,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return{
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };               
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(email, TokenFromServer) => {

      await SecureStore.setItemAsync("Token", TokenFromServer);
      // console.log(Token);
      dispatch({type:'LOGIN', token: TokenFromServer});
    },
    signOut: async() => {
      let result = await SecureStore.getItemAsync("Token");
      console.log(result);
      dispatch({type:'LOGOUT'});
    },
    signUp: () => {
      //TODO
    }
  }));

  useEffect(() => {
    setTimeout(async() => {
      dispatch({type:'RETRIVE_TOKEN', token: loginState.userToken});
    }, 1000);
  }, []);

  if( loginState.isLoading ){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <AuthContext.Provider value = {authContext}>
      <NavigationContainer>
        {loginState.userToken != null ? (
          <Drawer.Navigator
            drawerContent={props => <Drawercontent{...props}/>}
          >
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="History" component={HistoryScreen}/>
          </Drawer.Navigator>
          )
        :
          <RootStackScreen/>
        }
        
      </NavigationContainer>
    </AuthContext.Provider>

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

