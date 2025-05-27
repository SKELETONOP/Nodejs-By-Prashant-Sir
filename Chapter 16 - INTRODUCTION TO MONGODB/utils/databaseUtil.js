const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const MONGODB_URL =
  "mongodb+srv://root:Arpita@bulu2@clustermain.ewmxp49.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMain";

const mongoConnect = (callback) => {
  MongoClient.connect(MONGODB_URL)
    .then((client) => {
      console.log(client);
      callback(client);
    })
    .catch((err) => {
      console.log("error while connecting to client", err);
    });
};

module.exports = mongoConnect;
