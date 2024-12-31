const { getUser } = require("../utils/auth");
const restrictToLoginUsers = (req, res, next) => {
  const userUID = req.cookies?.uid;
  if (!userUID) {
    return res.redirect("/login");
  }
  const user = getUser(userUID);
  if (!user) {
    return res.redirect("/login");
  }
  req.user = user;
  next();
};

const checkAuth = async (req, res, next) => {
  const userUID = req.cookies?.uid;
  const user = getUser(userUID) ; 
  req.user = user;
  next();
};
module.exports = {
  restrictToLoginUsers,
  checkAuth,
};