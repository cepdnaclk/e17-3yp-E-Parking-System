const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
    ResevationID:{type: String, unique: true},
    customerID:{type: String, unique: true, required: false},
    parkingspotID:{type: String, unique: true, required: false},
    floornumber:{type: String, required: false},
    dateandtime:{type: String, required: false},
    status:{type: String, required: false}
});

const Reserve = mongoose.model("Reservation", ReservationSchema);
module.exports = Reserve;