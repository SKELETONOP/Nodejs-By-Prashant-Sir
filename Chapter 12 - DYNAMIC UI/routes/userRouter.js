const express = require('express');
const router = express.Router();
const { houses } = require('./hostRouter');

router.get("/", (req, res) => {
  const userSession = req.session.user;
  res.render("home", {
    homes: houses,
    pageTitle: "Home",
    user: userSession ? 'logout' : null,
    userName: userSession?.name || null,
    activeTab: "home",
  });
});


module.exports = router;
