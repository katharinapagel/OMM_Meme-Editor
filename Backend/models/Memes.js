const mongoose = require("mongoose")

//Shema is not complete yet
const MemeSchema = new mongoose.Schema({
    url: {type: String},
    title: {type: String, default:"Title"},
    description: {type: String, default:"This is a meme"},
    upvotes:{type: Number, default:0},
    downvotes:{type: Number, default:0},
    comments: {type: String, default:"Nice comment"},

    createdAt:{
        type:Date,
        default: new Date()
    }

});

const MemeModel = mongoose.model("Memes", MemeSchema);
export default MemeModel;