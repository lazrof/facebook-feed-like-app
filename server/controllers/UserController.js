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
    }).catch(error=>{
        res.status(500).json({
            error
        })
    })
}

function show(req,res){

    res.json({"message": "working!"});

    /* User.findOne({email: req.user.email})
    .then(user =>{
        res.json(user);
    }).catch(err =>{
        console.log(err)
        res.status(500).json({error})
    }); */
}

module.exports = { create, show}