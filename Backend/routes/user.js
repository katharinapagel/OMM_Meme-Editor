const router = require ("express").Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("./privateRoutes");

router.post("/userData", async (req, res) => {
    const user = await User.findOne({email: req.body.email})
    res.send(user);
});

//Register new Users: https://www.youtube.com/watch?v=2jqok-WgelI
router.post("/register", async (req, res) => {
    
    //Check if user is already in database
    const emailExist = await User.findOne({email: req.body.email})
        if(emailExist) return res.status(400).send("Email already exists");

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Crate a new user
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save()
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

//LogIn existing Users: https://www.youtube.com/watch?v=2jqok-WgelI
router.post("/login", async (req, res) => {

//Check if user if email exists
const user = await User.findOne({email: req.body.email})
if(!user) return res.status(400).send("Email not existing"); 

//Check if password is correct
const validPassword = await bcrypt.compare(req.body.password, user.password);
if(!validPassword) return res.status(400).send("Invalid password");

//Create and assign Web Token
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
res.header("auth-token", token).send(token);


})


module.exports = router;