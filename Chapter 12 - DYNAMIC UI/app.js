// Core Module
const path = require('path');
const session = require('express-session');


// External Module
const express = require('express');

//Local Module
const userRouter = require("./routes/userRouter")
const {hostRouter} = require("./routes/hostRouter")
const { authRouter } = require("./routes/authRouter");
const rootDir = require("./utils/pathUtil");
const { houses } = require('./routes/hostRouter');


const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');




app.use(express.static(path.join(rootDir, 'public')))






app.use(session({
  secret: 'yourSecretKey',
  resave: false,
  saveUninitialized: true
}));


app.use((req, res, next) => {
  res.locals.user = req.session.user; // makes `user` available in all EJS templates
  next();
});

// Middleware
app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);
app.use(authRouter);

app.get('/homes/:id', (req, res) => {
  const homeId = req.params.id;
  const selectedHome = houses.find(h => h.id === homeId);

  if (!selectedHome) {
    return res.status(404).render('404', {
      pageTitle: "Home Not Found",
      user: req.session.user ? 'logout' : null,
      activeTab: '',
    });
  }

  res.render('singleHome', {
    pageTitle: selectedHome.houseName,
    user: req.session.user ? 'logout' : null,
    activeTab: houses.houseName,
    home: selectedHome,
  });
});



app.use((req, res, next) => {
  res.status(404).render('404', {
    pageTitle: "Page Not Found",
    user:  'logout',
    activeTab: ''
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});