const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
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
        requried:true
    },
    createdEvents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    }],
    recievedInvitations:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Invitation'
    }],
})

const User = mongoose.model("User",userSchema);

module.exports = User; 