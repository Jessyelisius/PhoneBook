const express = require('express');
const validateTokens = require('../middleware/jwtToken');
const { CreateContact, GetContact, GetUserByTags } = require('../controller/contactsContrl');


const router = express.Router();

router.post('/create', validateTokens, CreateContact);
router.get('/getAll', validateTokens, GetContact);
router.get('/getTag', validateTokens, GetUserByTags);

module.exports = router;