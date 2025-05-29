const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res) => {
  Home.fetchAll()
  .then(homes =>{
    res.render("store/index", {
      homes: homes,
      pageTitle: "Index",
      activeTab: "index",
    });
  });
};

exports.getHome = (req, res) => {
  Home.fetchAll()
  .then(homes => {
    res.render("store/home-list", {
      homes: homes,
      pageTitle: "Home",
      activeTab: "home",
    });
  });
};

exports.getHomeDetails = (req, res) => {
  const homeId = req.params.id;
  
  Home.findById(homeId).then(home => {
    if (!home) {
      console.log("Home not found");
      return res.redirect("/");
    }
    res.render("store/home-details", {
      home: home,
      pageTitle: home.houseName,
      activeTab: "home"
      
    });
  })
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    activeTab: "bookings",
  });
};

exports.getFavourite = (req, res,next) => {
  Favourite.getFavourites().then(favourites => {
    favourites = favourites.map(fav => fav.houseId)
    Home.fetchAll().then(homes =>{
      const favouriteHomes = homes.filter((home) =>
        favourites.includes(home._id.toString())
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
  const fav = new Favourite(homeId);
  fav.save().then(result=>{
    console.log("fav Added", result)
  }).catch((err)=>{
    console.log("err while adding to fav", err),
    res.redirect('favourites')
  }).finally(()=>{
    res.redirect('favourites');
  })
};

exports.postRemoveFromFavourites = (req, res) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId).then(result=>{
    console.log("fav removed", result)
  }).catch((err)=>{
    console.log("err while removing to fav", err),
    res.redirect('/store/favourites')
  }).finally(()=>{
    res.redirect('/store/favourites');
  })
};
