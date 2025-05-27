const db = require("../utils/databaseUtil");

const { v4: uuidv4 } = require("uuid");

module.exports = class Home {
  constructor(houseName, ownerName, pricePerNight, location, rating, imgUrl, description) {
     this.houseName = houseName || null;
  this.ownerName = ownerName || null;
  this.pricePerNight = pricePerNight || null;
  this.location = location || null;
  this.rating = rating || null;
  this.imgUrl = imgUrl || null;
  this.description = description || null;
  this.id = uuidv4();
  }

  save() {
    if (this.id) {
      return db.execute(`UPDATE homes SET houseName = ?, ownerName = ?, pricePerNight = ?, location = ?, rating = ?, imgUrl = ?, description = ? WHERE id = ?`,
        [this.houseName, this.ownerName, this.pricePerNight, this.location, this.rating, this.imgUrl, this.description, this.id]
      );

    }else{
      return db.execute(`INSERT INTO homes (id, houseName, ownerName, pricePerNight, location, rating, imgUrl, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [this.id, this.houseName, this.ownerName, this.pricePerNight, this.location, this.rating, this.imgUrl, this.description]
    );
  }
  }
  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static deleteById(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }
};
