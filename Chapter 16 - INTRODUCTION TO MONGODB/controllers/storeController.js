const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res) => {
  Home.fetchAll()
  .then(([homes]) =>{
    res.render("store/index", {
      homes: homes,
      pageTitle: "Index",
      activeTab: "index",
    });
  });
};

exports.getHome = (req, res) => {
  Home.fetchAll()
  .then(([homes]) => {
    res.render("store/home-list", {
      homes: homes,
      pageTitle: "Home",
      activeTab: "home",
    });
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.id;
  
  Home.findById(homeId).then(([homes]) => {
    if (!homes) {
      console.log("Home not found");
      return res.redirect("/");
    }
    const home = homes[0]; // Get the first home from the array
    res.render("store/home-details", {
      pageTitle: home.houseName,
      activeTab: "home",
      home: home,
    });
  })
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    activeTab: "bookings",
  });
};

exports.getFavourite = (req, res) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll().then(([homes]) =>{
      const favouriteHomes = homes.filter((home) =>
        favourites.includes(home.id)
      );
      res.render("store/favourite-list", {
        homes: favouriteHomes,
        pageTitle: "My Favourites",
        activeTab: "favourites",
      });
    });
  });
};

exports.postAddToFavourites = (req, res) => {
  const homeId = req.body.homeId;
  if (!homeId) {
    console.log("No homeId provided");
    return res.redirect("/store");
  }

  Favourite.addToFavourites(homeId, (err) => {
    if (err) {
      console.error("Error adding to favourites:", err);
    } else {
      console.log("Added to favourites:", homeId);
    }
    res.redirect("/store/favourites");
  });
};

exports.postRemoveFromFavourites = (req, res) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId, error =>{
    if(error){
      console.log("error while removing from favouirtes", error)

    }res.redirect("/store/favourites")
  })
};
