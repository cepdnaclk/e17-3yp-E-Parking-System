const express = require('express');
const https = require('https');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "./config.env")});
const fs = require('fs');
const cors = require('cors');
const proxy = require("http-proxy-middleware");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
// module.exports = function(app){
//     app.use(
//         proxy("/user", {
//             target: "https://192.168.1.101:5000/registeredcustomers",
//             secure: faulse,
//             changeOrigin: true
//         })
//     );
// };
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.disable('x-powered-by');

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection has been established');
}); 

const RegisteredCustomersRout = require('./routes/Registration.js');
const GuestCustomersRout = require('./routes/GuestCustomers.js');
const ParkingSpotsRout = require('./routes/ParkingSpots.js');
const AssignToRout = require('./routes/AssignTo.js');
const ReservationRout = require('./routes/Reservation');
const ParkingLot = require('./routes/ParkingLot');
const { Certificate } = require('crypto');
const errorHandler = require('./middlewere/error.js');

app.use('/registeredcustomers', RegisteredCustomersRout);
app.use('/guestcustomers', GuestCustomersRout);
app.use('/parkingspots', ParkingSpotsRout);
app.use('/assignto', AssignToRout);
app.use('/reservation', ReservationRout);
app.use('/parkinglot', ParkingLot);
app.use("/", (req, res, next) => {
    res.send("Welcome!!!");
});
app.use(errorHandler);

app.listen(port, () => {
    console.log(`QP Server Listening at http://localhost:${port}`)
  })