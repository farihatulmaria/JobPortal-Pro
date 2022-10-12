const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
const usersSchme = mongoose.Schema({
    email:{
        type:String,
        validate:[validator.isEmail,"Please provid a valid email"],
        trim:true,
        lowercase:true,
        unique:true,
        required:[true,"Email address is required"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        validate:{
            validator:(value)=>validator.isStrongPassword(value),
            message:"The password must be strong"
        }
    },
    confirmPassword:{
        type:String,
        required:[true,"Please comfirm you password"],
        validate:{
            validator:function(value){
                return value = this.password
            }
        },
        message:"Password didn't matched"
    },
    role:{
        type:String,
        enum:['Candidate',"Hiring Manager","Admin"],
        default:"Candidate"
    },
    firstName:{
        type:String,
        required:[true,"Please type your first name"],
        trim:true,
        minLength:[3,"Name must be at least 3 characters"],
        maxLength:[100,"Name is too big for us to handle"]
    },
    lastName:{
        type:String,
        required:[true,"Please type your last name"],
        trim:true,
        minLength:[3,"Name must be at least 3 characters"],
        maxLength:[100,"Name is too big for us to handle"]
    },
    status:{
        type:String,
        enum:["active","in-active","blocked"],
        default:"active"
    },
    confirmationToken:String, 
    confirmationTokenExpires:Date,
    passwordChangedAt:Date, 
    passwordResetToken:String,
    passwordResetExpires:Date,
    },{
        timestamps:true
    })

usersSchme.pre("save",function(next){
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password)
    this.password = hashedPassword;
    this.confirmPassword = undefined;
})
usersSchme.methods.comparePassword=function(password,hash){
    const isPasswordValid = bcrypt.compareSync(password,hash);
    return isPasswordValid
}
usersSchme.methods.generateComfirmationToken=function(){
    const token = crypto.randomBytes(32).toString("hex");
    this.confirmationToken = token;
    
    const date = new Date();
    date.setDate(date.getDate()+1);
    this.confirmationTokenExpires = date;

    return token;
}

const Users = mongoose.model('Users',usersSchme);

module.exports = Users;