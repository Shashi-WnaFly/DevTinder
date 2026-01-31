const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { signupValidation } = require("../utils/validation");
const User = require("../models/user");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const Crypto = require("crypto");
const { PASSWORD_RESET_TEMPLATE } = require("../utils/constants");
const emailTransporter = require("../config/emailTransporter");

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
    res.status(400).json({ success: false, message: err.message, data: null });
  }
});

router.post("/logout", (req, res) => {
  res
    .cookie("token", null, { expires: new Date(Date.now()) })
    .json({ success: true, message: "logout successful." });
});

router.post("/send/otp", async (req, res) => {
  try {
    const { emailId } = req.body;
    if (!isEmail(emailId)) throw new Error("Invalid email address!!!");
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("An Error occurred!!!");
    const otp = Crypto.randomInt(100001, 999999).toString();
    const emailTemplate = PASSWORD_RESET_TEMPLATE.replace(
      "{{otp}}",
      otp,
    ).replace("{{email}}", emailId);
    const sub = "TinderDev Password Reset OTP";
    const options = {
      to: emailId,
      from: process.env.SENDER_EMAIL,
      subject: sub,
      html: emailTemplate,
    };
    await emailTransporter.sendMail(options);

    user.verifyOtp = otp;
    user.otpExpireAt = new Date(Date.now() + 30 * 60 * 1000);
    await user.save();
    res.json({ success: true, message: "OTP sent to your emailId." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post("/verify/otp", async (req, res) => {
  try {
    const { emailId, otp } = req.body;
    if (!otp) throw new Error("Missing OTP!!!");
    if (!isEmail(emailId)) throw new Error("Invalid email address!!!");
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid credentials");
    if (otp !== user.verifyOtp) throw new Error("Invalid OTP!!!");
    if (user.otpExpireAt < new Date()) throw new Error("OTP expired!!!");
    user.verifyOtp = null;
    user.isVerified = true;
    await user.save();
    res.json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post("/reset/password", async (req, res) => {
  try {
    const { emailId, newPass, confirmPass } = req.body;
    if (!isEmail(emailId)) throw new Error("Invalid email address!!!");
    if (newPass !== confirmPass) throw new Error("passwords do not match!!!");
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("Invalid credentials");
    if (user.otpExpireAt < new Date()) throw new Error("session expired!!!");
    const hashPassword = await bcrypt.hash(newPass, 10);
    user.password = hashPassword;
    user.otpExpireAt = null;
    await user.save();
    res.json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
