const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssignedToSchema = new Schema({
    customerID:{type: String, required: false},
    parkingspotID:{type: String, required: false},
    vehiclenumber:{type: String, required: false},
    cost:{type: Number, required: false},
    checkin:{type: String, required: false},
    checkout:{type: String, required: false},
    duration:{type: String, required: false}
});

const AssignSpot = mongoose.model("Assign", AssignedToSchema);
module.exports = AssignSpot;