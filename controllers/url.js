const { shortId } = require("shortid");
const { URL } = require("../models/url");
const generateURL = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ err: "url is required" });
  const shortID = sortid();
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
};

module.exports = generateURL;
