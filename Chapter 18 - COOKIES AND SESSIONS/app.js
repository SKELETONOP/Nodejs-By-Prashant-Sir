// Load environment variables first
require("dotenv").config();

// Core Module
const path = require("path");

// External Module
const express = require("express");
const session = require("express-session");

const MongoDBStore = require("connect-mongodb-session")(session);
const DB_PATH = `mongodb+srv://${process.env.DB_ID}:${process.env.DB_PASS}@clustermain.ewmxp49.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ClusterMain`;

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
app.use(bodyParser.urlencoded({ extended: true }));

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use(
  session({
    secret : "mySecretKey", // Replace with your own secret key
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);


app.use(authRouter);
app.use(StoreRouter);
app.use("/host", (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
});
app.use("/host", hostRouter);
app.use(pageNotFound);

const PORT = process.env.PORT || 3001;


mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error while connecting to database", err);
  });
