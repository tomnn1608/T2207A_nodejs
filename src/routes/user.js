const express = require("express");
const router = express.Router();
const controller = require("./../controllers/user.controller");

// all routes
router.use((req,res,next)=>{
    const auth = req.session.auth;
    if(auth){ // logged in
        return res.redirect("/");
    }
    next(); 
})
// only register
router.use("/register",(req,res,next)=>{
    // res.send("Time "+Date.now());
    next();
});

router.get("/register",controller.register);
router.post('/register',controller.postRegister);
router.get("/login",controller.login);
router.post('/login',controller.postLogin);

module.exports = router;