const mongoose = require("mongoose");
// const mongoURL='mongodb://127.0.0.1:27017/myapp';

mongoose.connect("mongodb://localhost:27017/Room_matching");
const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to mongodb server");
});

db.on("error", (err) => {
  console.log("Error in connection to mongodb server", err);
});

db.on("disconnected", () => {
  console.log("Disconnected from mongodb server");
});

module.exports = db;
