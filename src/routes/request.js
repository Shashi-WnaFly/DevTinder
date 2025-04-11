const express = require("express");
const router = express.Router();
const {userAuth} = require("../middlewares/auth");

router.post("/sendConnectionRequest", userAuth, (req, res) => {
  try {
    const { firstName } = req.user;
    res.send(firstName + " sent a connection request.");
  } catch (err) {
    res.send("ERROR : " + err.message);
  }
});

module.exports = router;