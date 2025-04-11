const express = require("express");
const app = express();
const connectDB = require("./config/database");
const User = require("./models/user");
const { signupValidation } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

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

    const isPasswordMatch = await user.validatePassword(password);

    if (isPasswordMatch) {
      const token = await user.getJWT();
      res.cookie("token", token, { expires : new Date(Date.now() + 9000000)});
      res.send("login successfully.");
    }
    else 
      throw new Error("Invalid credentials");
  } 
  catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try{
    const user = req.user;
    res.send(user);

  }catch(err){
    res.status(401).send("ERROR : " + err.message);
  }
})

app.post("/sendConnectionRequest", userAuth, (req, res) => {
  try{
    const {firstName} = req.user;
    res.send(firstName + " sent a connection request.");
  }catch(err){
    res.send("ERROR : " + err.message);
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
