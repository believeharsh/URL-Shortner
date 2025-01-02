// Import required modules
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

// Import custom modules
const connectMongo = require("./connection");
const urlMongo = require("./models/url");
const { restrictToLoginUsers, checkAuth } = require("./middlewares/auth");
const {redirecthandler} = require("./controllers/url")

// Import routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/users");

// Initialize the app
const app = express();

// Database Connection
connectMongo("mongodb://127.0.0.1:27017/URL-Shortner")
  .then(() => console.log("Connection to MongoDB is successful"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Route Handlers
// Protect the "/url" routes and ensure only logged-in users can access
app.use("/url", restrictToLoginUsers, urlRoute);

// Serve static routes with optional authentication
app.use("/", checkAuth, staticRoute);

// Publicly accessible routes for user actions (e.g., login, signup)
app.use("/users", userRoute);

// Redirect handler for short URLs
app.use("/url/:shortId", redirecthandler) ; 

// Server Initialization
const port = 8001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
