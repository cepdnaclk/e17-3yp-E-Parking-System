require('dotenv').config({ path: "./secret.env"});
const jwt = require('jsonwebtoken');

const RegUser = require('../models/RegisteredCustomers.model.js');

exports.protect = async (req, res, next) => {
    let token;
    token = req.headers.authorization;
    const id = token.split(" ")[1];
    if(!token){
        
        return res.status(400).json({sucsess: false, error: 'Error:1 '});
    }
    
    try{
        const decoded = jwt.verify(id, process.env.JWT_SECRET);
        console.log(decoded);
        
        const user = await RegUser.findById(decoded.id);

        if(!user){
            return res.status(400).json({sucsess: false, error: 'Error:2 '});
        }

        req.user = user;
        next();
        
    }catch (error){
        res.status(400).json({sucsess: false, error: error.message});
    }
}