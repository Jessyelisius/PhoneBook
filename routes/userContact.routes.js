const express = require('express');
const validateTokens = require('../middleware/jwtToken');
const { CreateContact, GetContact, GetUserByTags, updateContact, deleteContact, GetSingleContact } = require('../controller/contactsContrl');


const router = express.Router();
router.get('index', (req, res) =>{
    res.render('index')
})

router.post('/create', validateTokens, CreateContact);
router.get('/getAll', validateTokens, GetContact);
router.get('/getByTag', validateTokens, GetUserByTags);
router.get('/getSingleCntact', validateTokens, GetSingleContact);
router.put('/update/:id', validateTokens, updateContact);
router.delete('/delete/:id', validateTokens, deleteContact);

module.exports = router;