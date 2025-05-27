const e = require("express");
const Home = require("../models/home");


exports.getIndex = (req, res) => {
  Home.fetchAll((houses) => {
    res.render("store/index", {
      homes: houses,
      pageTitle: "Index",
      activeTab: "index",
    });
  });
};

exports.getHome = (req, res) => {
  Home.fetchAll((houses) => {
    res.render("store/home-list", {
      homes: houses,
      pageTitle: "Home",
      activeTab: "home",
    });
  });
};

exports.getSingleHome = (req, res) => {
  const homeId = req.params.id;

  Home.fetchAll((houses) => {
    const selectedHome = houses.find((h) => h.id === homeId);

    if (!selectedHome) {
      return res.status(404).render("404", {
        pageTitle: "Home Not Found",
        activeTab: "",
      });
    }

    res.render("store/home-details", {
      pageTitle: selectedHome.houseName,
      activeTab: "home",
      selectedHome: selectedHome,
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    activeTab: "bookings",
  });
};


exports.getFavourite = (req, res, next) => {
   Home.fetchAll((houses) => {
    res.render("store/favourite-list", {
      homes: houses,
      pageTitle: "My Favourites",
      activeTab: "favourites",
    });
  });
};
