const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");

router.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(401).send("ERROR : " + err.message);
  }
});

module.exports = router;
