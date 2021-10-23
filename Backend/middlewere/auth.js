require('dotenv').config({ path: "./secret.env"});
const jwt = require('jsonwebtoken');

const RegUser = require('../models/RegisteredCustomers.model.js');
const PLT = require('../models/ParkinLot.model');

exports.protect = async (req, res, next) => {
    let token;
    token = req.headers.authorization;

    if(!token){
        return res.status(400).json({sucsess: false, error: 'Invalid token'});
    }

    const id = token.split(" ")[1];
    
    try{
        const decoded = jwt.verify(id, process.env.JWT_SECRET);
        
        var user = await RegUser.findById(decoded.id);

        if (!user) {
            user = await PLT.findById(decoded.id);
        }

        if(!user){
            return res.status(400).json({sucsess: false, error: 'Not a VALID user'});
        }

        req.user = user;
        next();
        
    } catch (error){
        res.status(400).json({sucsess: false, error: error.message});
    }
}
