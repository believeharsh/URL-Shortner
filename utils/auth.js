const jwt = require("jsonwebtoken");
const secret = "&&hsdfggsdi()^%";

const setUser = (user) => {
  const payload = { ...user };
  return jwt.sign(payload, secret, { expiresIn: "1h" }); // Set expiration
};

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
