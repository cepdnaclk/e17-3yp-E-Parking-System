// defines pins numbers
const int trigPin = 2;  //D4
const int echoPin = 0;  //D3
const int ledPin = 4;  //D2 to indicate the state of the gate 
bool gateSignal;
bool state;

// defines variables
long duration;
int distance;

void setup() {
  
pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin, INPUT); // Sets the echoPin as an Input
pinMode(ledPin, OUTPUT); // Sets the ledPin as a
Serial.begin(9600); // Starts the serial communication

}

void loop() {

//If the server gives the signal--> open the gate



  
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
  distance= duration*0.034/2;
  // Prints the distance on the Serial Monitor
  Serial.print("Distance: ");
  Serial.println(distance);
  delay(1000);
  if(distance < 10){
    state = true;
    digitalWrite(ledPin, HIGH);
    delay(2000);  
  }
  else{
    state = false;
    digitalWrite(ledPin, LOW);
    delay(2000);
  }
  Serial.print("State: ");
  Serial.println(state);
  


 


}
