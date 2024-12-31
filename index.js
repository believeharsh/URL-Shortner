const express = require("express");
const path = require('path') ; 
const app = express();
const cookieParser = require("cookie-parser"); 

const connectMongo = require("./connection");
const urlMongo = require("./models/url");
const {restrictToLoginUsers, checkAuth} = require("./middlewares/auth");

// routes imports
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRoutes") ; 
const userRoute = require("./routes/users");


// connection with database
connectMongo("mongodb://127.0.0.1:27017/URL-Shortner")
  .then(() => console.log("connection is succussful"))

  .catch((err) => console.log("error on connection", err));

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended : false})) ; 
app.use(cookieParser()) ; 

app.set("view engine", "ejs") ; 
app.set("views" , path.resolve("./views")) ; 

// routes
app.use("/url", restrictToLoginUsers, urlRoute);
app.use("/" , checkAuth, staticRoute) ;
app.use("/users", userRoute ) ; 

app.use("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await urlMongo.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl) ; 
});

// app.get("/test", async (req, res) => {
//   try {
//     const allUrls = await urlMongo.find({}); // Use `await` to fetch data
//     return res.render('home' , {
//       urls  : allUrls
//     })
//   } catch(error) {

//   }
// });

const port = 8001;
app.listen(port, () => console.log("port is running at port", port));
