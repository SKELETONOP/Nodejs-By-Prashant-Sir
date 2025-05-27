// Core Module
const path = require('path');

// External Module
const express = require('express');

// Local Module
const StoreRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const { pageNotFound } = require('./controllers/errors');




const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.static(path.join(rootDir, 'public')));
app.use(express.urlencoded());
app.use(StoreRouter);
app.use("/host", hostRouter);
app.use(pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
