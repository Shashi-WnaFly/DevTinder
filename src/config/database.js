const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://2600shshianand:0R3Z1EgOwHLW1FZP@shashidev.savs4.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
