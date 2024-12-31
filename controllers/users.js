const users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { getUser, setUser } = require("../utils/auth");

const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await users.create({
    name: name,
    email: email,
    password: password,
  });
  return res.render("home", {
    mess : "user created succussfully",
  });
};
const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({
    email: email,
    password: password,
  });
  //   console.log("user", user);
  if (!user) {
    return res.render("Login", {
      mess: "Login correctly",
      error: "Invalid username or passwrod",
    });
  }
  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
