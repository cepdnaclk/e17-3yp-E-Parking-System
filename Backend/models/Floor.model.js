const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FloorSchema = new Schema({
    parkinglotID:{type: String, required: false},
    floornumber:{type: String, required: false},
    isfullyoccupied:{type: String, required: false},
    info:{type: String, required: false},
    noofparkingspots:{type: String, required: false}
});

const Floor = mongoose.model("Floor", FloorSchema);
module.exports = Floor;