const { v4: uuidv4 } = require("uuid");
const urlMongo = require("../models/url.js");

// function for generating new ShortURL for the given original urls ;
const generateNewShortURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ err: "url is required" });
  const shortId = uuidv4().slice(0, 8); // Extract the first 8 characters
  await urlMongo.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", {
    id: shortId,
  });
  1;
};

// function for getting the analytics that how many time user visited that short url's
const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await urlMongo.findOne({
    shortId,
  });
  return res.json({
    totalClick: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

// function for redirecting the user to the actuall url by using generated short URL by the application
const redirecthandler = async (req, res, next) => {
  const shortId = req.params.shortId;

  try {
    const entry = await urlMongo.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error("Error handling short URL redirect:", error);
    res.status(500).send("Internal server error");
  }
};

module.exports = {
  generateNewShortURL,
  handleGetAnalytics,
  redirecthandler,
};
