const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://2600shshianand:GkoPG1hiC5rz1mbS@shashidev.savs4.mongodb.net/?retryWrites=true&w=majority&appName=shashiDev"
  );
};

module.exports = connectDB;
