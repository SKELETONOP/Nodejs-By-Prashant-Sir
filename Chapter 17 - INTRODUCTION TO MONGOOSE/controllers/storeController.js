const Favourite = require("../models/favourite");
const Home = require("../models/home");
const Booking = require("../models/bookings");

exports.getIndex = (req, res) => {
  Home.find().then((homes) => {
    res.render("store/index", {
      homes: homes,
      pageTitle: "Index",
      activeTab: "index",
    });
  });
};

exports.getHome = (req, res) => {
  Home.find().then((homes) => {
    res.render("store/home-list", {
      homes: homes,
      pageTitle: "Home",
      activeTab: "home",
    });
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.id;

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/");
    }
    res.render("store/home-details", {
      home: home,
      pageTitle: home.houseName,
      activeTab: "home",
    });
  });
};

exports.getBookings = (req, res) => {
  Booking.find()
    .populate("home") // not houseId!
    .then((bookings) => {
      res.render("store/bookings-list", {
        pageTitle: "My Bookings",
        bookings,
        activeTab: "bookings",
      });
    })
    .catch((err) => {
      console.error("Error fetching bookings:", err);
      res.status(500).send("Error loading bookings");
    });
};




exports.postAddToBookings = (req, res) => {
  const homeId = req.body.homeId;
  console.log("Adding home to bookings:", homeId);

  Booking.findOne({ home: homeId })
    .then((existingBooking) => {
      if (existingBooking) {
        return res.redirect("/store/bookings");
      }

      const booking = new Booking({ home: homeId });
      return booking.save().then(() => {
        res.redirect("/store/bookings");
      });
    })
    .catch((err) => {
      console.error("Error while adding to bookings:", err);
      res.status(500).send("Internal Server Error");
    });
};

exports.postRemoveFromBookings = (req, res) => {
  const homeId = req.params.homeId;
  Booking.findOneAndDelete({ home: homeId })
    .then((result) => {
      console.log("Booking removed", result);
      res.redirect("/store/bookings");
    })
    .catch((err) => {
      console.log("err while removing to fav", err);
      res.redirect("/store/favourites");
    });
};


exports.getFavourite = (req, res, next) => {
  Favourite.find()
    .populate("houseId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.houseId);
      res.render("store/favourite-list", {
        homes: favouriteHomes,
        pageTitle: "My Favourites",
        activeTab: "favourites",
      });
    });
};

exports.postAddToFavourites = (req, res) => {
  const homeId = req.body.homeId;

  Favourite.findOne({ houseId: homeId })
    .then((existingFav) => {
      if (existingFav) {
        // Already exists, redirect and return early to avoid continuing the chain
        return res.redirect("/store/favourites");
      }

      const fav = new Favourite({ houseId: homeId });
      return fav.save().then(() => {
        res.redirect("/store/favourites");
      });
    })
    .catch((err) => {
      console.error("Error while adding to favourites:", err);
      res.status(500).send("Internal Server Error");
    });
};

exports.postRemoveFromFavourites = (req, res) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete({ houseId: homeId })
    .then((result) => {
      console.log("fav removed", result);
      res.redirect("/store/favourites");
    })
    .catch((err) => {
      console.log("err while removing to fav", err);
      res.redirect("/store/favourites");
    });
};
