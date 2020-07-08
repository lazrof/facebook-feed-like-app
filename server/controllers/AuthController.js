const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const User = require('../models/User');

function authenticate(req,res,next) {
    
}

function generateToken(req,res,next){
    if(!req.user) return next();

    userData = {
        id:req.user._id,
        email:req.user.email
    }

    req.token = jwt.sign(userData, secrets.secretKey, { expiresIn: 3600 });
  
    next();
}

function sendToken(req,res){
    if(req.user){
        res.json({
            user: req.user,
            jwt: req.token
        })
    }else{
        res.status(422).json({
            error: 'Could not create user'
        })
    }
}

module.exports = { generateToken, sendToken }