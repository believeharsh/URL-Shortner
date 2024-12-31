const express = require("express") ; 
const router = express.Router() ; 

const {generateNewShortURL, handleGetAnalytics} = require("../controllers/url") ; 

router.post("/" , generateNewShortURL) ; 
router.get("/analytics/:shortId" , handleGetAnalytics)


module.exports = router ; 