import Meme from "../models/Memes";

export const getMeme = async (req, res) => {
    try {
        const Memes = await Meme.find();

        res.status(200).json(Memes);
    
    }
    catch (error){

        res.status(404).json({message:error.message});
    }
}

export const createMeme = async(req, res) =>{
    const body = req.body;

    const newMeme = new Meme (post)
    try {
    await newMeme.save();

    res.status(201).json(newMeme)
    }

    catch (error){
        res.status(409).json({message:error.message});

    }
}