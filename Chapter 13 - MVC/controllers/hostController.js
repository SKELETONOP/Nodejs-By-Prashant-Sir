const Home = require("../models/home");

exports.getAddHome = (req, res) => {
  res.render("host/addHome", {
    pageTitle: "Add Home",
    activeTab: "add-home",
    currentPage: "add-home",
  });
};

exports.postAddHome = (req, res) => {
  const { houseName, ownerName, priceperNight, location, rating, imgUrl } = req.body;

  const home = new Home(
    houseName,
    ownerName,
    priceperNight,
    location,
    rating,
    imgUrl
  );

  home.save();

  res.render("host/home-added", {
    pageTitle: "Home Added",
    activeTab: "add-home",
  });
};



exports.getHostHome = (req, res) => {
  Home.fetchAll((houses) => {
    res.render("host/host-home-list", {
      homes: houses,
      pageTitle: "Host Homes List",
      activeTab: "Host-homes",
    });
  });
};
