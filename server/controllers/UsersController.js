const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const buildParams = require('./helpers').buildParams;

const validParams = ['email','name','password'];

function create(req,res,next){

    let params  = buildParams(validParams,req.body);
    let salt    = bcryptjs.genSaltSync(10);

    params.password = bcryptjs.hashSync(params['password'], salt);
    
    User.create(params)
    .then(user=>{
        req.user = user;
        next();
    }).catch(err=>{
        if (err.name === 'MongoError' && err.code === 11000) {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ err });
        }
        
    })
}


module.exports = { create }