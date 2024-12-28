const UserModel = require("../model/User.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => { 
    try {
        const collect = req.body;

        const availableUser = await UserModel.findOne({Email: collect.Email});
        if(availableUser){
           return res.status(400).render('signup',{Message: {UEmail: "user already registered with the email"}});
        }
        
        if(!collect?.Fullname) {
            return res.status(400).render('signup',{Message: {Fullname: "input your fullname"}});
        }
        if(!collect?.Email){
            return res.status(400).render('signup', {Message: {Email: "input your email"}})
        }
        if(isNaN(collect?.PhoneNo)){
            return res.status(400).render('signup', {Message: {PhoneNo: "invalid phone number"}})
        }
        if(!collect?.Address){
            return res.status(400).render('signup', {Message: {Address: "input your address"}});
        }

        if(collect.Password.length<6){
            return res.status(400).render('signup', {Message: {Password: "Password is short, min of 6 chars"}});
        }
        collect.Password =  await bcrypt.hash(collect.Password, 5);
        const saveUser = await UserModel.create(collect);

         res.redirect('login')
        
    } catch (error) {
        // res.status(404).json({Error: true, Message: "Error creating user"})
        res.render('404', {Message: `Unable to create user`});
        console.log(error);
    }
}

const LoginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        // Find user in the database
        const user = await UserModel.findOne({ Email });
        if (!user) {
            return res.status(400).render('login', { Message: { Email: "User is not registered" } });
        }

        // Validate password
        const pwdValid = bcrypt.compareSync(Password, user.Password);
        if (!pwdValid) {
            return res.status(400).render('login', { Message: { Password: "Incorrect password" } });
        }

        // Generate JWT token
        const AccessToken = jwt.sign(
            { user: {
                 id: user.id, 
                 Email: user.Email 
                } 
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        // Set token as a cookie
        res.cookie('token', AccessToken, {
            httpOnly: true, // Prevent access from JavaScript
            secure: process.env.SESSION_KEY, // Use secure cookies in production
            maxAge: 3600000, // Token expiry: 1 hour
        });

        // Redirect to contacts page
        res.redirect('/contacts');

    } catch (error) {
        console.error('Error during login:', error);
        res.redirect('/404');
    }
};

const LogoutUser = (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
};



module.exports = {
    createUser,
    LoginUser,
    LogoutUser
    
}