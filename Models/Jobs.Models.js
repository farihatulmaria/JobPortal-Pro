const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const jobSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please give the job a name"],
        trim:true,
        unique:true,
        maxLength:100
    },
    description:{
        type:String,
        required:[true,"Please write something about the job"]
    },
    salary:{
        type:Number,
        required:[true,"Please offer salary for the candidate for the job"],
        min:[0,"Worker should be paid for the hard work"],
        max:[2000,"The range is too high for the company"]
    },
    location:String,
    jobType:{
        type:String,
        required:[true,"Please the type of the job"]
    },
    manager:{
        name:String,
        id:{
            type:ObjectId,
            ref:"User",
        },
    },
    candiates:[{
        id:{
            type:ObjectId,
            ref:"Users"
        },
        pdfURL: {
            type: String,
            required: true,
            validate: {
              validator: (value) => {
                let isValid = true;
                value.forEach(url => {
                  if(!validator.isURL(url)){
                    isValid =  false;
                  }
                });
                return isValid;
              },
              message: "Please provide valid pdf url"
            }
        }
    }],
    appliedCandiates:{
        type:Number,
        min:[0,"This can't be negative"],
        default:0
    },
    deadLine:{
        type:Date,
        required:true
    },
    status:{
        type:String,
        enum:["active","in-active","discon"],
        default:"active"
    }
},{timestamps:true,})



const Jobs = mongoose.model('Jobs',jobSchema);

module.exports = Jobs;