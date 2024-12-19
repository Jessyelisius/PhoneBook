
const express = require('express');
const { createUser, LoginUser, Logout } = require('../controller/userContrl');
const validateTokens = require('../middleware/jwtToken');
const router = express.Router();

router.post('/register',createUser);
router.post('/login', LoginUser);
// router.post('/logout:id',validateTokens, Logout);

module.exports = router;
