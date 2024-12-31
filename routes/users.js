const express = require('express') ; 

const router = express.Router() ; 

const {
    handleUserSignUp,
    handleUserLogin
} = require('../controllers/users') ; 

router.post("/" , handleUserSignUp ) ; 
router.post("/login" , handleUserLogin)
module.exports = router ; 