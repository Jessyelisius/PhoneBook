const express = require('express');
const connectionDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const validateTokens = require('./middleware/jwtToken');
const cookieParser = require('cookie-parser');



const app = express();

const port  = process.env.PORT || 5000;
connectionDB();


//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cookieParser());

// Set view engine and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));


//////////route//////////
app.use('/', require('./routes/user.routes'));
app.use('/contacts', require('./routes/userContact.routes'));


app.get('/404', (req, res) => {
    res.render('404', { Message: 'Page not found' });
});

// Catch-all for undefined routes
app.use((req, res) => {
    res.status(404).redirect('/404');
});

app.listen(port, () =>{
    console.log(`api listening on port ${port}`);
});
