const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");

app.use(express.json());

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmail });
    if (users.length == 0) res.send("User not found");
    res.send(users);
  } catch (err) {
    res.status(401).send("Something went wrong.");
  }
});


app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try{
    await User.findByIdAndUpdate(userId, data);
    res.send("user updated successfully.");
  }catch(err){
    res.status(401).send("Something went wrong.");
  }
})


app.get("/feed", async (req, res) => {

  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(401).send("Something went wrong.");
  }
});

app.post("/signup", async (req, res) => {
  const userObj = new User(req.body);

  try {
    await userObj.save();
    res.send("User created successfully.");
  } catch (err) {
    res.status(404).send("Something went wrong.");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try{
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully.");
  }catch(err){
    res.status(400).send("Something went wrong.");
  }
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
