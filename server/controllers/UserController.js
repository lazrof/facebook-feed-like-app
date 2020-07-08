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
    //let algo = User.passwordValidate('algo');
    //res.json({"message": algo});

    // User.findOne({email: "nunzio2@test.com"})
    // .then(user => {

    //     if (user.passwordValidate('123456')) {
    //         res.json(user);
    //     }else{
    //         res.json({msg:'bad'});
    //     }
    // }).catch(err =>{
    //     console.log(err)
    //     res.status(500).json({err})
    // })

}

module.exports = { create, show}