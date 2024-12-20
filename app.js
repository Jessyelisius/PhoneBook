const express = require('express');
const connectionDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();


const app = express();

const port  = process.env.PORT || 5000;
connectionDB();


//middleware
// app.use(cors)
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//////////route//////////
app.use('/', require('./routes/user.routes'));
app.use('/contacts', require('./routes/userContact.routes'));

app.listen(port, () =>{
    console.log(`app listening on port ${port}`);
});
