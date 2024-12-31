const express = require('express') ; 
const router = express.Router() ; 
const urlMongo = require("../models/url") ; 

router.get("/" , async (req, res) => {
    if(!req.user) return res.redirect('/login') ; 
    const allUrls = await urlMongo.find({createdBy : req.user._id}) ; 
    return res.render('home' , {
        urls : allUrls,
    }) ; 
})

router.get("/signup" , async (req, res) => {
    return res.render('Signup') ; 
})
router.get("/login" , async (req, res) => {
    return res.render("Login") ; 
})

module.exports = router ; 