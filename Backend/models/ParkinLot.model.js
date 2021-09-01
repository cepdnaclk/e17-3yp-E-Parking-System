const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ParkingLotSchema = new Schema({
    company:{type: String, required: false},
    location:{type: String, required: false},
    isfullyoccupied:{type: String, required: false},
    hourlyrate:{type: String, required: false},
    nooffloors:{type: String, required: false}
});

const PLT = mongoose.model("ParkingLot", ParkingLotSchema);
module.exports = PLT;