const express = require("express");
const router = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/request");
const USER_SAFE_DATA = "firstName lastName photoUrl age skills gender about";
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const validator = require("validator");

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data Fetched Successfully.",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connections.map((row) => {
      if (row.fromUserId._id.toString() == loggedInUser._id.toString())
        return row.toUserId;
      return row.fromUserId;
    });

    res.json({ message: "Connections fetched successfully.", data: data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;
    const page = parseInt(req.query.page) || 1;
    let limit = req.query.limit;
    limit = limit > 50 ? 50 : limit;

    const connections = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUserId }, { fromUserId: loggedInUserId }],
    }).select("toUserId fromUserId");

    let hiddenUsers = new Set();
    hiddenUsers.add(loggedInUserId);

    connections.forEach((row) => {
      hiddenUsers.add(row.fromUserId.toString());
      hiddenUsers.add(row.toUserId.toString());
    });

    const feedUsers = await User.find({
      _id: { $nin: Array.from(hiddenUsers) },
    })
      .select(USER_SAFE_DATA)
      .skip((page - 1) * limit)
      .limit(limit);

    res.send(feedUsers);
  } catch (error) {
    res.send("" + error);
  }
});

router.post("/user/send/email", userAuth, async (req, res) => {
  try {
    let { name, fromAddress, subject, message } = req.body;

    if (name.length < 3 || name.length > 30)
      throw new Error("Please enter a valid name.");
    
    for (let str of name.split(" ")) {
      if (!validator.isAlpha(str))
        throw new Error("Please don't use symbol in your name.");
    }

    if (!validator.isEmail(fromAddress) || fromAddress.length > 30)
      throw new Error("Please enter a valid emailId.");

    if (subject.length < 3 || subject.length > 30)
      throw new Error("Please add a valid subject.");

    if (!message.length || message.length > 200)
      throw new Error("Please add a valid message.");

    await sendEmail.run(subject, `${name}<br/>${message}<br />${fromAddress}`);

    res.json({ message: "Message sent — we will get back to you soon!" });
  } catch (error) {
    res.status(201).json({ message: error.message });
  }
});

module.exports = router;
