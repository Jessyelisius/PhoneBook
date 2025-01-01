const express = require('express');
const validateTokens = require('../middleware/jwtToken');
const { CreateContact, GetContact, GetUserByTags, updateContact, deleteContact, GetSingleContact } = require('../controller/contactsContrl');
const ContactModel = require('../model/Contact.model');


const router = express.Router();

router.get('/', validateTokens, (req, res) =>{
    res.render('index',{Message: null});
});

router.post('/create', validateTokens, CreateContact);

// router.get('/listings', validateTokens, (req, res) =>{
//     res.render('listings', {Message: null, user: []});
// });
 
// router.get('/listings', validateTokens, GetUserByTags);

// router.get('/listings', validateTokens, GetUserByTags);

router.get('/listings', validateTokens, async (req, res) => {
    try {
        const tags = req.query.Tags;

        if (!tags) {
            return res.render('listings', { user: [], Message: "No tags specified in the query." });
        }

        // Fetch data from database
        const users = await ContactModel.find({ Tags: { $in: [tags] } });

        // Debug fetched data
        console.log("Users fetched:", users);

        // Check if users exist
        if (users.length > 0) {
            res.render('listings', { user: users, Message: null }); // Passing as `user`
        } else {
            res.render('listings', { user: [], Message: "No users found with the specified tag." });
        }
    } catch (err) {
        console.error("Error fetching users:", err);
        res.render('listings', { user: [], Message: "Server error while fetching users." });
    }
});


router.get('/contact',validateTokens, (req, res) =>{
    res.render('contact')
});


router.get('/getAll', validateTokens, GetContact);
router.get('/getSingleCntact', validateTokens, GetSingleContact);
router.put('/update/:id', validateTokens, updateContact);
router.delete('/delete/:id', validateTokens, deleteContact);

module.exports = router;