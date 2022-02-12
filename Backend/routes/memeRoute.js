const router = require ("express").Router();
const Meme = require("../models/Memes");

//source: https://www.youtube.com/watch?v=ngc9gnGgUdA - basic functionality of routing explained

//post request to route meme
router.post("/postMeme", async(req, res) => {


    const newMeme = new Meme ({
        url: req.body.url,
        title:req.body.title,
        description:req.body.description,
        upvotes:req.body.upvotes,
        downvotes:req.body.downvotes,
        comments:req.body.comments,
    })
    try {
    await newMeme.save();

    res.status(201).json(newMeme)
    }

    catch (error){
        res.status(409).json({message:error.message});

    }

});

//get request
router.get("/getMeme", async (req,res) => {
    try {
        const Memes = await Meme.find();

        res.status(200).json(Memes);
    
    }
    catch (error){

        res.status(404).json({message:error.message});
    }

}
)

module.exports = router;




  

