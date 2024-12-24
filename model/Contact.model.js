const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Contact = new Schema({
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
        Unique: true,
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
        type: Date,
        require: [true, "date of birth is needed"]
    },
    Tags:{
        type: Array,
        require: [true, "pls specify a tag"]
    },
    ProfilePic:{
        type: String,
        default: "https://res.cloudinary.com/dk5b3f7x5/image/upload/v1626885700/ContactApp/ProfilePic/default.png"
    }
}, {timestamps: true});

module.exports = mongoose.model('Contact', Contact);