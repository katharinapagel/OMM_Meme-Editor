const mongoose = require("mongoose")

//Schema for users in mongoDB

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    
    }
});

module.exports = mongoose.model("Users", UserSchema);
