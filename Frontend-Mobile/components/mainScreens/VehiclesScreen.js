import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, SafeAreaView } from 'react-native';
import { Provider, Portal, Modal, Avatar, TextInput, Button, IconButton, Card, Title, Paragraph, FAB, Divider } from 'react-native-paper';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';



const AddVehicle = (props) => {

  const { modalVisible, 
          modalDismiss,  
          vehicleNameHandler, 
          vehicleNumberHandler,
          addHandler
        } = props;

  const containerStyle = {backgroundColor: 'white', padding: 20, margin: 20 };

  return (
    <Portal>
      <Modal visible={modalVisible} onDismiss={modalDismiss} contentContainerStyle={containerStyle}>
        <Title>Add a vehicle</Title>
        
        <Divider style={{marginBottom: 20}} />
        
        <Text style={{marginBottom: 20}}>Enter your vehicle details</Text>
        
        
        <TextInput
          mode='outlined'
          label="Vehicle Name"
          dense={true}
          onChangeText={text => vehicleNameHandler(text)}
          style={{marginBottom: 10}}
        />

        
        <TextInput
          mode='outlined'
          label="License Plate Number"
          dense={true}
          onChangeText={text => vehicleNumberHandler(text)}
        />
        
        <Divider style={{marginBottom: 20}} />
        
        <Button onPress={() => {
          addHandler();
          modalDismiss();
        }}>Add Vehicle</Button>
        
      </Modal>
    </Portal>
  );
};

const VehiclesScreen = () => {

  const [visible, setVisible] = React.useState(false);

  const [userID, setUserID] = useState("");
  const [Vehicles, setVehivles] = useState([]);
  const [VehicleModels, setVehivleModels] = useState([]);

  useEffect(() => {
      async function getVehicals(){
          
          let result = await SecureStore.getItemAsync("Token");
          const config = {
              headers: {
                  authorization: `bearer ${result}`
              }
          }
  
          axios.get("http://192.168.43.52:5000/registeredcustomers/user", config).then((res) => {
            setUserID(res.data["_id"]);
            setVehivles(res.data["vehiclenumber"]);
            setVehivleModels(res.data["vehiclemodel"]);
          }).catch((err) => {
              alert(err.message);
          })   
     
      }
      getVehicals();
  }, [visible])
  
  

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  
  
  const CreateButton = () => {
    return (
      <FAB
        style={Styles.fab}
        label="Add"
        icon="plus"
        onPress={showModal}
      />
    );
  };

  const [vehicleName, setVehicleName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');


  const handleVehicleAdd = () => {

    console.log("Vehicle Added {" + vehicleName + ", " + vehicleNumber + "}")

    axios.post("http://192.168.43.52:5000/registeredcustomers/updateVnumberVmodel", {
      _id: userID,
      vehiclenumber: vehicleNumber,
      vehiclemodel: vehicleName
    })

  }
  
  
  
  return (
    <Provider>
      <SafeAreaView style={Styles.container} >
      
        <AddVehicle 
          modalVisible = {visible}
          modalDismiss = {hideModal}
          vehicleNameHandler = {setVehicleName}
          vehicleNumberHandler = {setVehicleNumber}
          addHandler = {handleVehicleAdd}
        />
        
        <ScrollView>
         {Vehicles.map( (vehiclenumber,index) => (
            <Card style={Styles.card}>
              <Card.Title
              key={index}
              title={vehiclenumber} 
              subtitle={VehicleModels[index]} 
              right= {() => (
                <View style={{flexDirection: 'row'}} >
                  <IconButton onPress={() => console.log('Edit')} icon="pen" color='#1f1f1f' size={20} />
                  <IconButton onPress={() => console.log('Delete')} icon="delete" color='#1f1f1f' size={20} />
                </View>
              )}
            />
          </Card>            
          ))}
          
          
        </ScrollView>
        
        <CreateButton />
          
      </SafeAreaView>
    </Provider>
  );
  
  
  /*return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <CreateButton />
    </Provider>
  );*/
  
};

export { VehiclesScreen };

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'        
    },
    card: {
      margin: 10,
      height: 100,
    },
    fab: {
      backgroundColor: '#01d28e',
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
    },
});