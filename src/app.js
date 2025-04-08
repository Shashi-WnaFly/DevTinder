const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { signupValidation } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    signupValidation(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      gender,
      skill,
      age,
      about,
      photoUrl,
    } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      gender,
      skill,
      age,
      about,
      photoUrl,
      password: hashPassword,
    });
    await user.save();
    res.send("User created successfully.");
  } catch (err) {
    res.status(404).send("ERROR : " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) 
      throw new Error("Invalid credentials");

    const user = await User.findOne({ emailId: emailId });

    if (!user) 
      throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      res.cookie("token", "wtaggeagroinaiofnainefoanefinwefsakqnionfe");
      res.send("user logged in successfully.");
    }
    else 
      throw new Error("Invalid credentials");
  } 
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.send("reading cookies");
})

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.findOne({ emailId: userEmail });
    if (users.length == 0) res.send("User not found");
    res.send(users);
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "skill",
      "age",
      "photoUrl",
      "about",
      "gender",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) throw new Error("Update not Allowed");

    if (data.skill.length > 20) throw new Error("skill cannot be more than 20");

    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("user updated successfully.");
  } catch (err) {
    res.status(401).send("Something went wrong. " + err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(401).send("Something went wrong.");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully.");
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

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
