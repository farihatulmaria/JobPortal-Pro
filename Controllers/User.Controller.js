const bcrypt = require('bcryptjs');
const Users = require('../Models/User.Models.js');
const { signUpService, getUserByEmail } = require("../Services/Users.Service.js");
const { generateToken } = require('../utils/token');

module.exports.signUp = async (req,res,next)=>{
    const userInfo = req.body;
    console.log(userInfo);
    try {
        const user = await signUpService(userInfo);
        // const token = user.generateConfirmationToken();
        // await user.save({ validateBeforeSave: false });

        res.status(200).json({
            status:'passed',
            message:"you are now a user",
            Data:user
        })
    } catch (err) {
        res.status(400).json({
            status:'You shall not pass',
            message:"you aren't a user now",
            error:err.message
        })
    }
}

module.exports.login = async (req,res,next)=>{
    const {email,password} = req.body;
    try {
        if(!email || !password){
            res.status(401).json({
                status:'You shall not pass',
                error:"please provide your email and password",
            })
        }
        const user = await getUserByEmail(email);
        if(!user){
            res.status(401).json({
                status:'You shall not pass',
                error:"You aren't a user. Please create a account first",
            })
        }
        const isPasswordValid = user.comparePassword(password,user.password)
        if(!isPasswordValid){
            res.status(403).json({
                status:'You shall not pass',
                error:"You're password isn't correct",
            })
        }
        if(user.status != "active"){
            res.status(401).json({
                status:'You shall not pass',
                error:"You're account isn't active yet",
            })
        }
        const userToken = generateToken(user);
        const {password:pwd ,...others} =  user.toObject()

        res.status(200).json({
            status:'passed',
            message:"You are a user now",
            Data:{
                user:others,
                token:userToken
            }
        })
    } catch (err) {
        res.status(400).json({
            status:'You shall not pass',
            message:"you aren't a user",
            error:err.message
        })
    }
}

module.exports.getMe = async(req,res)=>{
    try {
        const user = await getUserByEmail(req?.user?.email);
        res.status(200).json({
            status:'passed',
            message:"You are a user",
            Data:user
        })
        
    } catch (err) {
        res.status(400).json({
            status:'You shall not pass',
            message:"you aren't a user",
            error:err.message
        })
    }
}
