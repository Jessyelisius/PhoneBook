const jwt = require('jsonwebtoken');
const UserModel = require('../model/User.model');

const validateTokens = async (req, res, next) => {
    let token;

    // Try to get the token from headers or cookies
    const AuthHeader = req.headers.authorization || req.headers.Authorization;
    if (AuthHeader && AuthHeader.startsWith('Bearer')) {
        token = AuthHeader.split(' ')[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token; // Check cookies for the token
    }

    if (!token) {
        console.error('No token provided. Redirecting to 404.');
        return res.redirect('/404'); // Redirect to 404 if no token
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            console.error('Invalid or expired token:', err.message);
            return res.redirect('/404'); // Redirect to 404 on token issues
        }

        // Optionally verify if the user exists in the database
        const user = await UserModel.findById(decoded.user.id);
        if (!user) {
            console.error('User does not exist');
            return res.redirect('/404');
        }

        req.user = decoded.user; // Attach user to the request
        next();
    });
};

module.exports = validateTokens;
