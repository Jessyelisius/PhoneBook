const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
    Fullname:{
        type: String,
        required: [true, "fullname is required"]
    },
    Email:{
        type: String,
        required: [true, "enail is required"],
        unique: [true, "email already in use"]
    },
    Password:{
        type: String,
        required: [true, "password is required"]
    },
    PhoneNo:{
        type: String,
        required: [true, "phone number is required"]
    },
    Address:{
        type: String,
        required:[true, "please address is required"]
    }
    
},{timestamps: true});


module.exports = mongoose.model('User', User);