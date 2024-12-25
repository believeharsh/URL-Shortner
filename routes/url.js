const express = require('express') ; 
const {generateURL} = require('../controllers/url')
const router = express.Router() ; 
router.post("/" , generateURL) ; 

module.exports = router ; 