const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

const MONGODB_URL =
  "mongodb+srv://root:root@clustermain.ewmxp49.mongodb.net/?retryWrites=true&w=majority&tls=true";
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(MONGODB_URL)
    .then((client) => {
      callback();
      _db = client.db('airbnb')
    })
    .catch((err) => {
      console.log("error while connecting", err);
    });
};

const getDB = ()=>{
  if(!_db){
    throw new Error ("database not connected")
  }
  return _db;
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;


