//this is a test route which is not used in the application but was used for testing
const router = require ("express").Router();
const verify = require("./privateRoutes");

router.get("/", verify, (req, res) => {
    res.json({memes: {title: "my first meme",
    description: "random data"}})
})

module.exports = router;