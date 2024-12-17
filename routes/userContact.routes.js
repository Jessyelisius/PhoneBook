const express = require('express');
const validateTokens = require('../middleware/jwtToken');
const { CreateContact } = require('../components/contactsComponents');


const router = express.Router();

router.post('/create', validateTokens, CreateContact);

module.exports = router;