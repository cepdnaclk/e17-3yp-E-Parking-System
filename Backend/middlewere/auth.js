require('dotenv').config({ path: "./secret.env"});
const jwt = require('jsonwebtoken');

const RegUser = require('../models/RegisteredCustomers.model.js');

exports.protect = async (req, res, next) => {
    let token;
    token = req.headers.authorization;
    const id = token.split(" ")[1];
    if(!token){
        
        return res.status(400).json('Error:1 ');
    }
    
    try{
        const decoded = jwt.verify(id, process.env.JWT_SECRET);
        console.log(decoded);
        
        const user = await RegUser.findById(decoded.id);

        if(!user){
            return res.status(402).json('Error: 2');
        }

        req.user = user;
        next();
        
    }catch (error){
        return res.status(406).json('Error3: ');
    }
}