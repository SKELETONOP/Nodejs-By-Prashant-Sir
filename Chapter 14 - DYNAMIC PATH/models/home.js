// core modules
const fs = require("fs");
const path = require("path");

// local modules
const rootDir = require("../utils/pathUtil");

// external modules
const { v4: uuidv4 } = require("uuid");
const Favourite = require("./favourite");

// data file path
const homeDataPath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, ownerName, priceperNight, location, rating, imgUrl) {
    this.houseName = houseName;
    this.ownerName = ownerName;
    this.priceperNight = priceperNight;
    this.location = location;
    this.rating = rating;
    this.imgUrl = imgUrl;
  }

  save() {
    Home.fetchAll((homes) => {
      if (this.id) {
        /// edit home case

        homes = homes.map((home) => (home.id === this.id ? this : home));
      } else {
        // add home case
        this.id = uuidv4();
        homes.push(this);
      }

      fs.writeFile(homeDataPath, JSON.stringify(homes, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Home saved successfully.");
        }
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, "utf8", (err, data) => {
      if (err) {
        if (err.code === "ENOENT") {
          // File doesn't exist yet
          return callback([]);
        } else {
          console.error("Error reading file:", err);
          return callback([]);
        }
      }

      try {
        const homes = data ? JSON.parse(data) : [];
        callback(homes);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        callback([]);
      }
    });
  }

  static findById(homeId, callback) {
    this.fetchAll((homes) => {
      const homeFound = homes.find((h) => h.id === homeId);
      callback(homeFound);
    });
  }

  
  static deleteById(homeId, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);
      
      fs.writeFile(homeDataPath, JSON.stringify(homes), error=>{
        Favourite.deleteById(homeId, callback)
      });
    });
  }
};
