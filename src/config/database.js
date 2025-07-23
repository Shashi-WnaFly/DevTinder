const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://2600shshianand:qgMZrKSSYVd8iiWa@shashidev.savs4.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
