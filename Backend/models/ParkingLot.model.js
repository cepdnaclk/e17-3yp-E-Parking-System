const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const ParkingLotSchema = new Schema({
    company:{type: String, required: false},
    location:{type: String, required: false},
    isfullyoccupied:{type: String, required: false},
    hourlyrate:{type: Number, required: false},
    nooffloors:{type: Number, required: false},
    email:{type: String, unique:true, required: true, match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/]},
    password:{type: String, unique:true, required: true, minlength: 6, select: false },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

ParkingLotSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next();
});

ParkingLotSchema.methods.matchPasswords = async function(password){
    console.log(password, this.password);
    const val = await bcrypt.compare(password, this.password);
    console.log(val);
    return val
};

ParkingLotSchema.methods.getSignedToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
};


ParkingLotSchema.plugin(uniqueValidator, {message: 'Email already exists'});
const PLT = mongoose.model("ParkingLot", ParkingLotSchema);
module.exports = PLT;