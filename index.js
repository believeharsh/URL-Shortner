const express = require('express') ;
const {connectToMongo} = require('./connect');

const urlRoute = require("./routes/url") ; 

const app = express() ; 
const PORT = 8001 ; 
connectToMongo("mongodb://localhost:27017/shortURL")
.then(() => console.log("mongodb connected"))
.catch((err) => console.log("err" , err)) ; 

app.use(express.json()) ; 
app.use("/url", urlRoute) ; 

app.listen(PORT, () => console.log('server started at Port' + PORT)) ; 