const express = require('express');
const connectionDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');


const app = express();

const port  = process.env.PORT || 5000;
connectionDB();


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))

//////////route//////////
app.use('/users', require('./routes/user.routes'));
app.use('/contacts', require('./routes/userContact.routes'));

app.listen(port, () =>{
    console.log(`api listening on port ${port}`);
});
