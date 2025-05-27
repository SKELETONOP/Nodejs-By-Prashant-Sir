// core modules
const fs = require("fs");
const path = require("path");

// local modules
const rootDir = require("../utils/pathUtil");

// external modules
const { v4: uuidv4 } = require("uuid");

// fake database
// This is a fake database for the purpose of this exercise.

module.exports = class Home {
  constructor(houseName, ownerName, priceperNight, location, rating, imgUrl) {
    this.id = uuidv4();
    this.houseName = houseName;
    this.ownerName = ownerName;
    this.priceperNight = priceperNight;
    this.location = location;
    this.rating = rating;
    this.imgUrl = imgUrl;
  }

  save() {
    Home.fetchAll((homes) => {
      homes.push(this);
      const homeDatapath = path.join(rootDir, "data", "homes.json");
      fs.writeFile(homeDatapath, JSON.stringify(homes, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
        }
      });
    });
  }

  static fetchAll(callback) {
    const homeDatapath = path.join(rootDir, "data", "homes.json");

    fs.readFile(homeDatapath, "utf8", (err, data) => {
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
};
