const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/request");
const USER_SAFE_DATA = "firstName lastName photoUrl age skills gender about";
const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const {
  PASSWORD_RESET_TEMPLATE,
  EMAIL_VERIFY_TEMPLATE,
} = require("../utils/constants");
const validator = require("validator");
const emailTransporter = require("../config/emailTransporter");
const bcrypt = require("bcrypt");

router.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      success: true,
      message: "Data Fetched Successfully.",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
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

    res.json({
      success: true,
      message: "Connections fetched successfully.",
      data: data,
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
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

    res.json({
      success: true,
      message: "Message sent — we will get back to you soon!",
    });
  } catch (error) {
    res.status(201).json({ success: false, message: error.message });
  }
});

router.post("/user/send/otp", async (req, res) => {
  try {
    const { emailId, type } = req.body;
    if (!validator.isEmail(emailId)) throw new Error("Invalid emailId");

    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("User not found!!!");
    const otp = crypto.randomInt(100001, 999999).toString(); // more secure than Math.random
    let emailTemplate;
    let subject;
    if (type === "reset") {
      emailTemplate = PASSWORD_RESET_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        emailId,
      );
      subject = "TinderDev Reset Password OTP";
    } else {
      emailTemplate = EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        emailId,
      );
      subject = "TinderDev Email Verification OTP";
    }
    const options = {
      to: emailId,
      from: process.env.SENDER_EMAIL,
      subject: subject,
      html: emailTemplate,
    };
    await emailTransporter.sendMail(options);
    user.verifyOtp = otp;
    user.otpExpireAt = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes from now
    await user.save();
    res.json({ success: true, message: "OTP sent to your emailId." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.post("/user/verify/otp", async (req, res) => {
  try {
    const { emailId, otp, type, pass, confirmpass } = req.body;
    if (!validator.isEmail(emailId)) throw new Error("Invalid emailId");
    const user = await User.findOne({ emailId: emailId });
    if (!user) throw new Error("User not found!!!");
    if (user.otpExpireAt < new Date()) throw new Error("OTP expired!!!");
    if (user.verifyOtp !== otp) throw new Error("Invalid OTP!!!");
    if (type === "verify") {
      user.isVerified = true;
    } else {
      if (!pass || !confirmpass) throw new Error("missing details!!!");
      if (pass !== confirmpass) throw new Error("passwords do not match!!!");
      if (!validator.isStrongPassword(pass))
        throw new Error("Weak password!!!");
      const passwordHash = await bcrypt.hash(pass, 10);
      user.password = passwordHash;
    }
    user.verifyOtp = null;
    user.otpExpireAt = null;
    await user.save();
    res.json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});
module.exports = router;
