const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    AssistantName:{
        type:String
    },
    AssistantImage:{
        type:String
    },
    // store the history of user what he talks with the assistant
    history:[
        {
            type:String
        }
    ]
},{timestamps:true})

module.exports = mongoose.model("user",userSchema);