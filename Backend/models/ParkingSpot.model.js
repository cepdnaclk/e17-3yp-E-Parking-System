const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ParkingSpotSchema = new Schema({
    state:{type: String, required: false},
    floornumber:{type: Number, required: false}
});

const ParkingSpot = mongoose.model("ParkingSpot", ParkingSpotSchema);
module.exports = ParkingSpot;