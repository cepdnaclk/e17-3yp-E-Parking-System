const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GuestCustomersSchema = new Schema({
    vehiclenumber:{type: String, required: false}
    
});

const GuestUser = mongoose.model("GuestUser", GuestCustomersSchema);
module.exports = GuestUser;