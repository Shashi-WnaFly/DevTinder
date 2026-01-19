const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { signupValidation } = require("../utils/validation");
const User = require("../models/user");
const validator = require("validator");

router.post("/signup", async (req, res) => {
  try {
    signupValidation(req);
    const { firstName, lastName, emailId, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    const signUpUser = await user.save();
    const token = await signUpUser.getJWT();
    res.cookie("token", token, { expires: new Date(Date.now() + 9000000) });
    res.json({ success: true, data: signUpUser });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!validator.isEmail(emailId)) throw new Error("Invalid credentials");

    const user = await User.findOne({ emailId: emailId });

    if (!user) throw new Error("Invalid credentials");

    const isPasswordMatch = await user.validatePassword(password);

    if (isPasswordMatch) {
      const token = await user.getJWT();
      res.cookie("token", token, { expires: new Date(Date.now() + 9000000) });
      res.json({ success: true, data: user });
    } else throw new Error("Invalid credentials");
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({ success: true, message: "logout successful." });
});

module.exports = router;
