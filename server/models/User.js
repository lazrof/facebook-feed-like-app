const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now()
    }
});

userSchema.methods.passwordValidate = function search (rawPassword) {

    // Load hash from your password DB.
    return bcryptjs.compareSync(rawPassword, this.password); // true
}

const User = mongoose.model('User',userSchema);

module.exports = User;
