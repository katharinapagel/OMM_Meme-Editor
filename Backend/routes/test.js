
const router = require ("express").Router();


router.get("/", (req, res) => {
res.send("this works");
});

module.exports = router;




