const mongoose = require("mongoose")

//Schema for meme in mongoDB - source: https://www.youtube.com/watch?v=ngc9gnGgUdA - schema explained

const MemeSchema = new mongoose.Schema({
    url: {type: String},
    title: {type: String, default:"Title"},
    description: {type: String, default:"This is a meme"},
    upvotes:{type: Number, default:0},
    downvotes:{type: Number, default:0},
    comments: {type: String, default:"Nice comment"}

    // createdAt:{
    //     type:Date,
    //     default: new Date()
    // }

});

module.exports = mongoose.model("Memes", MemeSchema);