
const express = require('express');
const { createUser, LoginUser, Logout } = require('../controller/userContrl');
const validateTokens = require('../middleware/jwtToken');
const router = express.Router();

router.get('/signup',(req, res) => {
    res.render('signup', {Message:null});
});

router.post('/register',createUser);

router.get('/login',(req, res) => {
    res.render('login', {Message: null});
});

router.post('/login', LoginUser);


// router.post('/logout:id',validateTokens, Logout);

module.exports = router;
