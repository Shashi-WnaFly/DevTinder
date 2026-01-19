const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfile,
  validatePasswordUpdate,
} = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

router.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.post("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) throw new Error("Invalid edit field!!!!");

    const user = req.user;
    Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

    const updatedData = await user.save();

    res.json({
      success: true,
      message: `${user.firstName}, Your profile updated successfully.`,
      data: updatedData,
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

router.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { password } = req.params;
    if (!validator.isStrongPassword(password))
      throw new Error("Please Enter A Strong Password As A New Password!!");

    if (!validatePasswordUpdate(req))
      throw new Error("password is not correct!!!");

    const passwordHash = await bcrypt.hash(password, 10);
    const user = req.user;
    user.password = passwordHash;
    await user.save();
    res.json({ success: true, message: "password updated successfully." });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
});

module.exports = router;
