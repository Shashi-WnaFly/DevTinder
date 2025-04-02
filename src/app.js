const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.post("/signup", async (req, res) => {

  const userObj = new User({
    firstName: "Shashi",
    lastName: "Anand",
    emailId: "shashianand@goto.com",
    age: 28,
  });

  await userObj.save();
  res.send("User created successfully.");
})

connectDB()
  .then(() => {
    console.log("database is successfully connected.");
    app.listen(7777, () => {
      console.log("Server is successfully running....");
    });
  })
  .catch(() => {
    console.log("database is not connected.!!!!");
  });
