#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <time.h>
#include <Servo.h>
#include "secrets.h"

Servo servo;

// defines pins numbers
const int trigPin = 13;  
const int echoPin = 12;  
const int ledPin = 15;  //To indicate the state of the gate 
bool gateStatus; //Gate state --> true if open
bool state = false; //To sense the presence of the vehicle --> true if occupied

// defines variables
int distance;
 
#define AWS_IOT_PUBLISH_TOPIC   "quickpark/abcmall/updatespot"
#define AWS_IOT_SUBSCRIBE_TOPIC "quickpark/abcmall/spotgate"
 
WiFiClientSecure net;
 
BearSSL::X509List cert(cacert);
BearSSL::X509List client_crt(client_cert);
BearSSL::PrivateKey key(privkey);
 
PubSubClient client(net);
 
time_t now;
time_t nowish = 1510592825;
 
 
void NTPConnect(void)
{
  Serial.print("Setting time using SNTP");
  configTime("GMT+5:30", "pool.ntp.org", "time.nist.gov");
  now = time(nullptr);
  while (now < nowish)
  {
    delay(500);
    Serial.print(".");
    now = time(nullptr);
  }
  Serial.println("done!");
  struct tm timeinfo;
  gmtime_r(&now, &timeinfo);
  Serial.print("Current time: ");
  Serial.print(asctime(&timeinfo));
}
 
 
void messageReceived(char *topic, byte *payload, unsigned int length)
{
  String topicStr = topic;
  String msg = "";
  
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
    msg += String((char)payload[i]); 
  }
  Serial.println();

  ///////////////////////////////////////////////////////////////////////////

  //Jsonify received string
  StaticJsonDocument<256> doc; 
  deserializeJson(doc, payload, length); 
  
 
  //If the message asks to open the gate --> gateSignal = true
  if(strcmp(topic, AWS_IOT_SUBSCRIBE_TOPIC) == 0){
    Serial.println("Matching topic");
    String spot = doc["spot"];
    String gatestatus = doc["gatestatus"];

    
    if(gatestatus.equals("open") && spot.equals(spotNumber)){
      gateStatus = true;
      Serial.println("Gate is open");
      //Open the gate   --> light up the LED indicator
      digitalWrite(ledPin, HIGH);
      servo.write(90);
      delay(1000);
    }
  
    //If the message asks to close the gate --> gateSignal = false
    /*if(gatestatus.equals("close") && spot.equals(spotNumber)){
      gateSignal = false;
      Serial.println("Gate is closed");
      //Close the gate   --> turn off the LED indicator
      digitalWrite(ledPin, LOW);
      servo.write(0);
      delay(1000);
      state = false;
      Serial.print("State: ");
      Serial.println(state);
    }*/
    
  }
}
 
 
void connectAWS()
{
  delay(3000);
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
 
  Serial.println(String("Attempting to connect to SSID: ") + String(WIFI_SSID));
 
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(1000);
  }
 
  NTPConnect();
 
  net.setTrustAnchors(&cert);
  net.setClientRSACert(&client_crt, &key);
 
  client.setServer(MQTT_HOST, 8883);
  client.setCallback(messageReceived);
 
 
  Serial.println("Connecting to AWS IOT");
 
  while (!client.connect(THINGNAME))
  {
    Serial.print(".");
    delay(1000);
  }
 
  if (!client.connected()) {
    Serial.println("AWS IoT Timeout!");
    return;
  }
  // Subscribe to a topic
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);
 
  Serial.println("AWS IoT Connected!");
}
 
 
void setup()
{
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  pinMode(ledPin, OUTPUT); // Sets the ledPin as an Output
  Serial.begin(9600); // Starts the serial communication

  //Setting up the servo motor
  servo.attach(14);
  servo.write(0);
  delay(1000);

  connectAWS();
}

int get_distance() {
  long duration;

  // Clears the trigPin
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  // Reads the echoPin, returns the sound wave travel time in microseconds
  duration = pulseIn(echoPin, HIGH);
  
  // Calculating the distance
  return duration*0.034/2;
}
 
 
void loop()
{

  //To detect the presence
  if(gateStatus){ //Only if the gate is open
    
    //Get Distance from Ultrasound Sensor
    distance = get_distance();
    delay(1000);

    /////////////////////////////////////////////////////////////////////
    const size_t CAPACITY = JSON_OBJECT_SIZE(6);
    StaticJsonDocument<CAPACITY> doc;
    doc["spot"] = spotNumber;


    if (!state) {   // If unoccupied (Not entered yet)
      
      //Determine whether the car is fully parked or not
      if(distance < 30){
        state = true;

        //Send message to the server indicating status:Occupied
        doc["status"] = "Occupied";
        char out[128];
        int b =serializeJson(doc, out);
        
        //Publish message
        client.publish(AWS_IOT_PUBLISH_TOPIC, out);
        Serial.println(out);
        delay(2000);  
      }
      else{
        Serial.println("Not occupied!");
      }
    }
    else {  // If occupied (Monitor for exit)
      if (distance >= 30) {
        delay(5000);
        distance = get_distance();

        if (distance >= 30) {
          state = false;

          gateStatus = false;
          Serial.println("Closing gate");
          //Close the gate   --> turn off the LED indicator
          digitalWrite(ledPin, LOW);
          servo.write(0);
          delay(1000);

          //Send message to the server indicating status:Not Occupied
          doc["status"] = "Not Occupied";
          char out[128];
          int b =serializeJson(doc, out);
          
          //Publish message
          client.publish(AWS_IOT_PUBLISH_TOPIC, out);
          Serial.println(out);
          delay(2000);  
        }
      }
    }
   
    Serial.print("State: ");
    Serial.println(state);
  
  }

  delay(2000);
 
  now = time(nullptr);
 
  if (!client.connected())
  {
    connectAWS();
  }
  else
  {
    client.loop();
  }
}