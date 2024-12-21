const express = require('express');
const validateTokens = require('../middleware/jwtToken');
const { CreateContact, GetContact, GetUserByTags, updateContact, deleteContact } = require('../controller/contactsContrl');


const router = express.Router();

router.post('/create', validateTokens, CreateContact);
router.get('/getAll', validateTokens, GetContact);
router.get('/getTag', validateTokens, GetUserByTags);
router.put('/update/:id', validateTokens, updateContact);
router.delete('/delete/:id', validateTokens, deleteContact);

module.exports = router;