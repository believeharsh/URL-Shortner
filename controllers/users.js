const users = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../utils/auth");


// function for signing up the users
const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await users.create({
    name: name,
    email: email,
    password: password,
  });
  return res.render("home", {
    mess: "user created succussfully",
  });
};

// function for get the user log in the site 
const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({
    email: email,
    password: password,
  });
  if (!user) {
    return res.render("Login", {
      mess: "Login correctly",
      error: "Invalid username or passwrod",
    });
  }
  const token = setUser(user);

  res.cookie("uid", token);
  return res.redirect("/");
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
