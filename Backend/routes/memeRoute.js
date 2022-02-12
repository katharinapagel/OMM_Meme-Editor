const router = require ("express").Router();
const Meme = require("../models/Memes");
import {createMeme} from "../controllers/posts"

router.post("/", createMeme);
  
  module.exports = router;