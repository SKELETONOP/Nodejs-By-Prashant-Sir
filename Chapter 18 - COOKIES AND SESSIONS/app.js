// Core Module
const path = require("path");

// External Module
const express = require("express");

// Local Module
const StoreRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const { pageNotFound } = require("./controllers/errors");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(express.static(path.join(__dirname, "src")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(StoreRouter); // ✅ Adds "/store" as a prefix to all store routes
app.use("/host", (req,res,next)=>{
  if(!req.isLoggedIn){
    return res.redirect("/login");
  }
  next();
})
// app.use("/host", hostRouter);
app.use(authRouter);
app.use(pageNotFound);
const PORT = 3000;

const dbPath = "mongodb+srv://root:root@clustermain.ewmxp49.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ClusterMain";

mongoose.connect(dbPath).then(()=>{
  console.log("connected to mongoDB");
  app.listen(PORT,()=>{
    console.log(`Server is running on the address http://localhost:${PORT}`);
  })
}).catch((err)=>{
    console.log("error while connecting to database" , err)
  })