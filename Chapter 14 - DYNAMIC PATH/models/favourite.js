// core modules
const fs = require("fs");
const path = require("path");

// local modules
const rootDir = require("../utils/pathUtil");

// external modules
const { v4: uuidv4 } = require("uuid");

// data file path
const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourites(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        console.log("Already in favourites");
        callback(); // still call the callback to avoid hanging
      } else {
        favourites.push(homeId);
        console.log("Added to favourites");
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), (err) => {
          if (err) {
            console.error("Error writing favourites file:", err);
          }
          callback();
        });
      }
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavourites((homeIds) => {
      homeIds = homeIds.filter((homeId) => delHomeId !== homeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      if (err || !data.length) {
        callback([]);
      } else {
        try {
          const favourites = JSON.parse(data);
          callback(favourites);
        } catch (parseErr) {
          console.error("Error parsing favourites JSON:", parseErr);
          callback([]);
        }
      }
    });
  }
};
