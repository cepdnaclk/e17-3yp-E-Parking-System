require('dotenv').config({ path: "./config.env"});
const express = require('express');
const https = require('https');
const path = require('path');
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
app.use(express.urlencoded({extended:true}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB connection has been established');
}); 

const ParkingLotRoute = require('./routes/ParkingLot.js');
const RegisteredCustomersRout = require('./routes/Registration.js');
const GuestCustomersRout = require('./routes/GuestCustomers.js');
const ParkingSpotsRout = require('./routes/ParkingSpots.js');
const AssignToRout = require('./routes/AssignTo.js');
const ReservationRout = require('./routes/Reservation');
const { Certificate } = require('crypto');
const errorHandler = require('./middlewere/error.js');

app.use('/registeredcustomers', RegisteredCustomersRout);
app.use('/guestcustomers', GuestCustomersRout);
app.use('/parkingspots', ParkingSpotsRout);
app.use('/assignto', AssignToRout);
app.use('/reservation', ReservationRout);
app.use('/parkinglot', ParkingLotRoute);
app.use("/", (req, res, next) => {
    res.send("hi");
});
app.use(errorHandler);

// const sslserver = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'certificate', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'certificate', 'certificate.pem'))
// }, app);
// sslserver.listen(port, () => {
//     console.log(`Express server is running on port: ${port}`);
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })