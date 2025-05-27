const Home = require("../models/home");
const db = require("../utils/databaseUtil");

exports.getAddHome = (req, res) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home",
    activeTab: "Add-home",
    currentPage: "Add-home",
    editing: false,
  });
};

exports.getEditHome = (req, res) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  // console.log(homeId, editing);
  Home.findById(homeId).then(([homes]) => {
    if (!homes || homes.length === 0) {
      console.log("home not found");
      res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      home: homes[0],
      pageTitle: "Edit Home",
      activeTab: "edit-home",
      currentPage: "Host-home",
      editing: editing,
    });
  });
};

exports.postEditHome = (req, res, next)=>{
  const {id, houseName, ownerName, pricePerNight, location, rating, imgUrl, description } =
    req.body;

  const home = new Home(
    houseName,
    ownerName,
    pricePerNight,
    location,
    rating,
    imgUrl,
    description
  );
  home.id = id;

  home.save().then(()=>{
    res.redirect("/host/host-home-list");
  }).catch(error => {
    console.log("error while saving home", error);
    res.redirect("/host/host-home-list");
  });

}

exports.postAddHome = (req, res) => {
  const { houseName, ownerName, pricePerNight, location, rating, imgUrl, description } =
    req.body;

   const home = new Home(
    houseName ,
    ownerName ,
    pricePerNight ,
    location ,
    rating ,
    description 
  );

  home.save();
  res.redirect("host-home-list")
 
};

exports.getHostHome = (req, res) => {
  Home.fetchAll().then(([houses]) => {
    res.render("host/host-home-list", {
      homes: houses,
      pageTitle: "Host Homes List",
      activeTab: "Host-homes",
    });
  });
};


exports.postDeleteHome = (req, res, next)=>{
  const homeId = req.params.homeId;
  console.log("came for delete",homeId)
  Home.deleteById(homeId).then(result =>{
    console.log("Home Deleted successfully")
    res.redirect("/host/host-home-list")
  }).catch(error =>{
    console.log("error while deleting", error)
  });
}
