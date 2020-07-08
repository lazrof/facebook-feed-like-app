const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const User = require('../models/User');

function authenticate(req,res,next) {
    
    if (req.body.email && req.body.password) {

        User.findOne({email: req.body.email})
        .then(user=>{

            passwordValidate = user.passwordValidate(req.body.password)
            
            if (passwordValidate) {
                req.user = user;
                next()
            }else{
                next(new Error('Invalid Credentials'));
            }
        }).catch(error=> next(error));

    } else {
        next(new Error('Missing Email or Password'));
    }

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

module.exports = { generateToken, sendToken, authenticate}