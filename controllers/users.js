const users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../utils/auth");

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
  const token = setUser(user) ; 

  res.cookie("uid", token);
  return res.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
