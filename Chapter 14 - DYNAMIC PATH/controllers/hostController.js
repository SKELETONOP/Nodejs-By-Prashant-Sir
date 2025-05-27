const Home = require("../models/home");

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
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("home not found");
      res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit Home",
      activeTab: "edit-home",
      currentPage: "Host-home",
      editing: editing,
    });
  });
};

exports.postEditHome = (req, res, next)=>{
  const {id, houseName, ownerName, priceperNight, location, rating, imgUrl } =
    req.body;

  const home = new Home(
    houseName,
    ownerName,
    priceperNight,
    location,
    rating,
    imgUrl
  );
  home.id = id;

  home.save();

  res.redirect("host-home-list")
}

exports.postAddHome = (req, res) => {
  const { houseName, ownerName, priceperNight, location, rating, imgUrl } =
    req.body;

  const home = new Home(
    houseName,
    ownerName,
    priceperNight,
    location,
    rating,
    imgUrl
  );

  home.save();
  res.redirect("host-home-list")
 
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


exports.postDeleteHome = (req, res, next)=>{
  const homeId = req.params.homeId;
  console.log("came for delete",homeId)
  Home.deleteById(homeId, error =>{
    if(error){
      console.log("error while deleting", error)
    }else{
      console.log("Home Deleted successfully")
      res.redirect("/host/host-home-list")
    }
  });
  
}
