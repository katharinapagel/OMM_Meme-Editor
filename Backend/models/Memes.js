const mongoose = require("mongoose")

//Shema is not complete yet
const MemeSchema = new mongoose.Schema({
    id: {type: Number},
    name: {type: String},
    url: {type: String},
    width: {type: String},
    height: {type: String},
    title: {type: String},
    description: {type: String},
    upvotes:{type: Number},
    downvotes:{type: Number},
    comments: {type: String},

});

const MemeModel = mongoose.model("Memes", MemeSchema);
module.exports = MemeModel;