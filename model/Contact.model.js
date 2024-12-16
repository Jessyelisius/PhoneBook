const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    UserId:{
        type: String,
        required: true
    },
    Name:{
        type: String,
        required: [true, "name is required"]
    },
    PhoneNo:{
        type: Number,
        required: [true, "phone number is required"]
    },
    Email:{
        type: String,
        required: [true, "email is required"]
    },
    Address:{
        type: String,
        required: [true, "address is required"]
    },
    DOB:{
        type: String,
        require: [true, "date of birth is needed"]
    },
    Tags:{
        type: Array,
        require: [true, "pls specify a tag"]
    }
}, {timeseries: true});

module.exports = mongoose.model('Contact', ContactSchema);