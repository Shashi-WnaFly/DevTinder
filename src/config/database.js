const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://2600shshianand:K7CAiHeQ9WAMRJtz@shashidev.savs4.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
