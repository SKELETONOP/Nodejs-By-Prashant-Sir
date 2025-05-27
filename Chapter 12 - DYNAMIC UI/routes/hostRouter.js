// Core Module


// External Module
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const hostRouter = express.Router();

const houses = [];

// GET route to render form
hostRouter.get("/add-home", (req, res) => {
  res.render("addHome", {
    pageTitle: "Add Home",
    user: "logout",
    activeTab: "add-home",
  });
});

// POST route
hostRouter.post("/add-home", (req, res) => {
  const { houseName, ownerName, priceperNight, location, rating, imgUrl } = req.body;

  const newHouse = {
    id: uuidv4(), // ✅ Add unique ID
    houseName,
    ownerName,
    priceperNight,
    location,
    rating,
    imgUrl
  };

  houses.push(newHouse);

  console.log(`${newHouse.houseName} added with ID ${newHouse.id}`);
  console.log(houses);

  res.render("homeAdded", {
    pageTitle: "Home Added",
    user: "logout",
    activeTab: "add-home",
  });
});

exports.hostRouter = hostRouter;
exports.houses = houses;
