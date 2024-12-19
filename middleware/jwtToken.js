const jwt = require('jsonwebtoken');

const validateTokens = async (req, res, next) => {
    let token;
    let AuthHeader = req.headers.Authorization || req.headers.authorization;

    if(AuthHeader && AuthHeader.startsWith("Bearer")){
        token = AuthHeader.split(" ")[1];

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err){
                res.status(400)
                console.error("User is not authorised | token is expired")
            }
            req.user = decoded.user;
            next();
        });
        if(!token){
            return res.status(400).json("this user is not authorised or token is missing")
        }
    }
}

module.exports = validateTokens
