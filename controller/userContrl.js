const UserModel = require("../model/User.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const createUser = async (req, res) => { 
    try {
        const collect = req.body;

        const availableUser = await UserModel.findOne({Email: collect.Email});
        if(availableUser){
           return res.status(400).json({Error: true, Message: "user already registered with the email"});
        }
        
        if(!collect?.Fullname) {
            return res.status(400).json({Error: true, Message: "input your fullname"});
        }
        if(!collect?.Email){
            return res.status(400).json({Error: true, Message: "input your email"})
        }
        if(isNaN(collect?.PhoneNo)){
            return res.status(400).json({Error: true, Message: "invalid phone number"})
        }
        if(!collect?.Address){
            return res.status(400).json({Error: true, Message: "input your address"});
        }

        collect.Password =  await bcrypt.hash(collect.Password, 5);
        const saveUser = await UserModel.create(collect);

        return res.status(200).json({Error: false, Message: "user created"})

        
    } catch (error) {
        res.status(400).json({Error: true, Message: "Unable to create user"})
        console.log(error);
        
    }
}

const LoginUser = async (req, res) => {
    try {
        const {Email, Password} = req.body;

        const user = await UserModel.findOne({Email});
        if(!user)return res.status(400).json({Error: true, Message: "User is not registered"});
        
        let pwdValid = bcrypt.compareSync(Password, user.Password)
        if(!pwdValid)return res.status(400).json({Error: true, Message: "Incorrect password"})

        const Acesstoken = jwt.sign({
            user:{
                Email: user.Email,
                Password: user.Password,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'});

        res.status(200).json({
            Error: false, 
            Message: "Login successful",
            Token:Acesstoken,
            User:{
                id:user.id,
                Email: user.Email,
                Fullname:user.Fullname
            }

        })
        
    } catch (error) {
        res.status(404).json({Error: true, Message: "Error login in"})
        console.log(error);
    }
}

// const Logout = async () =>{
//    try {
    
//         const token = jwt.sign({userId: user.id});
//         if(!token)return res.status(400).json({Error: true, Message: "User not found"})

//         ////remove the token form local storage

//         localStorage.removeItem("token");
//         Cookies.remove("token")

//         res.status(200).json({Error: false, Message: "user logged out"})

//    } catch (error) {
//         res.status(404).json({Error: true, Message: "error trying"})
//         console.log(error);
//    }
// }

module.exports = {
    createUser,
    LoginUser
    
}