const jwt = require("jsonwebtoken");
const secret = "&&hsdfggsdi()^%";

// this function create the payload (token) and signed with the secret key
const setUser = (user) => {
  const payload = { ...user };
  return jwt.sign(payload, secret, { expiresIn: "1h" }); // Set expiration
};

// this function check the upcoming token form browser and varify with the secret key
const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return null;
  }
};

module.exports = {
  setUser,
  getUser,
};
