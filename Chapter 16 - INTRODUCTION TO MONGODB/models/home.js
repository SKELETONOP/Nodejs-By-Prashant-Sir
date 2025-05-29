const { getDB } = require("../utils/databaseUtil");
const { ObjectId } = require("mongodb");

module.exports = class Home {
  constructor(houseName, ownerName, pricePerNight, location, rating, imgUrl, description, id) {
    this.houseName = houseName;
    this.ownerName = ownerName;
    this.pricePerNight = pricePerNight;
    this.location = location;
    this.rating = rating;
    this.imgUrl = imgUrl;
    this.description = description;
    if (id) {
      this._id = new ObjectId(id); // use _id for MongoDB
    }
  }

save() {
  const db = getDB();
  if (this._id && ObjectId.isValid(String(this._id))) {
    return db
      .collection("homes")
      .updateOne(
        { _id: new ObjectId(String(this._id)) },
        { $set: this }
      );
  } else {
    return db.collection("homes").insertOne(this);
  }
}




  static fetchAll() {
    const db = getDB();
    return db
      .collection("homes")
      .find()
      .toArray()
      .then((homes) => {
        return homes;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next()
      .then((homes) => {
        return homes;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
