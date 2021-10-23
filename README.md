
[//]: # (Please refer the instructions in below URL for the configurations)
[//]: # (https://projects.ce.pdn.ac.lk/docs/how-to-add-a-project)

# E-Parking System

____

### Content
* [Introduction](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#introduction)
  * [Overview](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#overview)
  * [Real world problem](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#real-world-problem)
  * [Project objective](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#project-objective)
* [Solution Architecure](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#solution-architecture)
* [Hardware Designs](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#hardware-designs)
* [Network Architecture](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#network-architecture)
* [Security Aspects](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#security-aspects)
* [Bill of Materials](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#bill-of-materials)
* [Team Members](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#team-members)
* [Supervisors](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#supervisors)
* [Related Links](https://github.com/cepdnaclk/e17-3yp-E-Parking-System#related-links)

## Introduction

### Overview
* Urbanization has led to quick and efficient parking being vital. 
* Human-operated parking lots have a lot of inherent flaws.
* An autonomous parking system could address these issues effectively.

### Real world problem
* Manual systems are highly inefficient and Leads to long queues and waiting times.
* It is difficult to manage the allocation of parking spaces.
* Owners cannot easily get an idea of the overall status.

### Project objective
This project aims at **eliminating the overheads** and inefficiencies associated with manual parking systems in order to **provide a comprehensive solution**  that addresses the **concerns of** both the **consumers** as well as the **owners** of the parking lot.

## Solution Architecture
Our solution architecture consists of entrance/exit Nodes, the parking spot nodes, the mobile app and management portal representing the frontend of the system and the cloud server. The hardware nodes have been given their own power supplies and the all the frontend software and the hardware nodes are connected to the cloud server via Wi-Fi.
![Solution Architecture](https://github.com/cepdnaclk/e17-3yp-E-Parking-System/blob/main/docs/images/SolArch.png)

### Parking Management Portal
A management portal for the owners to view and manage their car park. This allows them to easily manage parking spots and collect usage statistics (Daily and weekly statistics).
It can be accessed from anywhere and no additional software is required. React JS and Node.js were used in developing this portal as a Single Page Application since it is ideal for the purpose of a dashboard that updates itself in real-time.

### Mobile App
The car park users can register for the service through the app. They can reserve parking spots in advance and can make card payments using the mobile app. The app also provides
directions to the assigned parking spot once a user is inside the parking lot. The app has been developed using React Native.

### Entrance/Exit Nodes
These nodes moniter the vehicles at the entrance/exit of the car park. The license plate of the incoming/outgoing vehicles are recognized through the images captured by a camera and processing them in the Raspberry Pi (Python and Tessaract OCR will be used for the Automatic Number Plate Recognition in the Raspberry Pi). It displays the assigned parking spot number in a LCD display. The gate and proximity sensors will control the flow of vehicles.

### Spot Nodes
The purpose of these nodes is to detect the parking spot status using a proximity sensor and send that information back to the server. NodeMCU used will communicate the presence of vehicle to cloud and controls the gate.

![Solution Architecture 2](https://github.com/cepdnaclk/e17-3yp-E-Parking-System/blob/main/docs/images/nodes.png)

### Data and Control Flow
The data and control flow of the system gets initiated at the entrance node once a user enters into the parking lot. The licenese plate number of that vehicle will be scanned by the entrance node and it will be sent to the server along with the check-in time. In the meantime, the mobile app will authenticates the user using their location. Once a parking spot is sent by the server, the user will be guided to that spot through the use of clear images using the mobile phone and the necessary updates will be made in the management portal. Once the user reaches the parking spot, the spot node will check and update the status of the spot (occupied or not). Once the user leaves their assigned spot and reaches the exit node, the exit node will obtain the license plate number and the check-out time and will send that information to the server. Once the cost has been processed by the server based on the hourly rate set by the managers of the parking lot, the amount to be paid will be sent to the mobile app while displaying the value on the LCD display.

## Hardware Designs
![Hardware Designs](https://github.com/cepdnaclk/e17-3yp-E-Parking-System/blob/main/docs/images/hardware.png)

### Entrance/Exit Node
HC-SR04 ultrasonic distance sensors will sense the incoming vehicle at the entrance node and the digital camera will get the license plate image. This image will be processed at the Raspberry Pi 4 (Python and Tessaract OCR will be used for the Automatic Number Plate Recognition in the Raspberry Pi) and the necessary data will be send to the server. Once a spot number is received from the server, the Raspberry Pi 4 will signal the servo motor to open the gate while displaying the spot number on the LCD display. Each hardware node has an AC-DC power supply attached and the components operate on 5V DC. We will have secure WiFi with standard WPA2 encryption to avoid unauthorized access.

### Spot Node
The servo motor will open the spot gate once a spot is assigned to a vehicle. The NodeMCU ESP8266 will decide the parking spot status based on the sensor data received from the HC-SR04 ultrasonic distance sensor and the spot status will be sent to the server. We will be creating an ESP-MESH to create a Wi-Fi mesh network and will be using the in-built Wi-Fi module for connectivity. NodeMCU ESP8266 takes in 5VDC power but operates on 3V3DC power. Similar to the entrance/exit node, power will be provided using and AC-DC power supply. Unauthorized parties may intercept communication between the nodes and the server. To prevent this, as mentioned before, secure WiFi channels with standard WPA encryption will be used to ensure secure connection to the server.

## Network Architecture
![Network Architecture](https://github.com/cepdnaclk/e17-3yp-E-Parking-System/blob/main/docs/images/server.png)

For the backend we will be using the MERN Stack (MongoDB Database, Express.js web framework, React.js Frontend Framework, Node.js server). The backend is primarily handled by a Node.js web server running on an AWS cloud VM instance. The Express web framework is used to simplify the development process since it abstracts away things like HTTP request handling, parsing URLs etc. In-built Express methods are used to develop the REST API that the web application and the mobile app uses to communicate with the server. The REST API endpoints will use HTTPS to leverage TLS/SSL encryption for the communication with the server.

A MongoDB database on an Atlas instance is used for data storage. The Mongoose data modelling library is used to provide a layer of abstraction to the connection between the Node server and the database. The Atlas service provides the ability to do routine backups of the database. The hardware nodes will communicate with the server using the MQTT protocol. The server will interact with the hardware nodes using AWS IoT Core. MQTT can be configured to use TLS/SSL encryption so that the communication is secure.

The server runs the spot picking algorithm (Python script) as a child processes using the child-process library. Reservation handling is done by running it as a separate JavaScript file, which handles reservations one hour prior to the reservation time. Owners can observe reservations through the management portal. Records of usage of the parking lot are stored in the database and the temporary storage has a lifetime of three months. (Reservations and spot assignments.) Cors library is used to enable CORS (Cross-Origin Resource Sharing) for security. This allows us to limit access to the API based on the origin. Bcrypt is used for password hashing which uses the blowfish cipher with ten salting rounds to prevent attacks without a large hit to performance. Jsonwebtoken is used for user authentication. This generates a session token for a registered user when they log in that can be used to authenticate the user with the credentials stored in the database. Details of the REST API endpoints for the server side are available in the project repository.

During a power outage, if the car park management decides to keep the car park open despite the hardware nodes being down, they can manually enter the data into the system through the management portal to keep the system up-to-date so that it can recover properly and continue operation once it is back online. Hardware node online/offline status will be detected by the transmission of an MQTT “heartbeat” message every 5 mins.

## Security Aspects
Our system security is mainly characterized by the five elements given above. Bcrypt has been used for password hashing in order to securely store login credentials of the users. CORS (Cross-Origin Resource Sharing) is used for security to limit access to the API based on the orgin. Atlas will limit ingress access to requests coming in from the server’s IP address (Server communicates with Atlas instance over HTTPS). Access Management Control is deployed within the system by covering the 3A's; Authentication, Authorization and Accountability. Jsonwebtoken is used for user authentication, while using the location of the user checked at the entrance. We only allow GET method access for the mobile app users using CORS.

## Bill of Materials
![Bill of Materials](https://github.com/cepdnaclk/e17-3yp-E-Parking-System/blob/main/docs/images/bom.png)

## Team Members
1. E/17/296 Ravisha Rupasinghe [[Website](http://www.ce.pdn.ac.lk/e17-batch/), [Email](mailto:e17296@ce.pdn.ac.lk)]
2. E/17/251 Sandun Sanjaya Perera [[Website](http://www.ce.pdn.ac.lk/e17-batch/), [Email](mailto:e17251@ce.pdn.ac.lk)]
3. E/17/018 Imesh Balasuriya [[Website](http://www.ce.pdn.ac.lk/e17-batch/), [Email](mailto:e17018@ce.pdn.ac.lk)]


## Supervisors
1. Dr. Isuru Nawinne [[Website](http://www.ce.pdn.ac.lk/academic-staff/), [Email](mailto:isurunawinne@ce.pdn.ac.lk)]
2. Dr. Mahanama Wickramasinghe [[Website](http://www.ce.pdn.ac.lk/academic-staff/), [Email](mailto:mahanamaw@ce.pdn.ac.lk)]

## Related Links

- [Project Page](https://cepdnaclk.github.io/e17-3yp-E-Parking-System/)
- [Department Website](http://www.ce.pdn.ac.lk/)
- [Faculty Website](https://eng.pdn.ac.lk/)
