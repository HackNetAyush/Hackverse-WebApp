const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URL;

const connectToDB = async () => {
  try {
    await mongoose.connect(url);
    console.log("Connected to database");
  } catch (e) {
    console.log(e);
    process.exit(0);
  }
};

module.exports = connectToDB;
