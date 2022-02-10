const router = require ("express").Router();
const verify = require("./privateRoutes");

router.get("/", verify, (req, res) => {
    res.json({memes: {title: "my first meme",
    description: "random data"}})
})

module.exports = router;