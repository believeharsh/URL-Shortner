const { v4: uuidv4 } = require("uuid");
const urlMongo = require("../models/url.js");
// console.log(urlMongo);

const generateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ err: "url is required" });
  const shortId = uuidv4().slice(0, 8); // Extract the first 8 characters
  await urlMongo.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy : req.user._id,
  });
  return res.render("home" , {
    id : shortId,
  }) ; 
1 };

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId ; 
    const result =  await urlMongo.findOne({
        shortId
    }) ; 
    return res.json({
        totalClick : result.visitHistory.length , 
        analytics  : result.visitHistory,
    }) ; 
}

module.exports = {
  generateNewShortURL,
  handleGetAnalytics
};
