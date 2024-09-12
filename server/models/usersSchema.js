const mongoose = require("mongoose");
const validator = require('validator')

const usersSchema = new mongoose.Schema({
    fname:{
        type:String,
        require:true,
        trime:true
    },
    lname:{
        type:String,
        require:true,
        trime:true
    },
    email:{
        type:String,
        require:true,
        trime:true,
        unique:true,
        validate(value){
            if (!validator.isEmail) {
                throw  Error("not vallid email");
                
            }
        }
    },
    mobile:{
        type:String,
        require:true,
        trime:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    gender:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        require:true,
    },
    profile:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true,
    },
    datecreated:Date
})

// model
const users = new mongoose.model("users", usersSchema)

module.exports = users

