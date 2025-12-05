const express = require("express");
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const { targetUserId } = req.params;
    const loggedUserId = req.user._id;

    let chat = await Chat.findOne({
      participants: {
        $all: [loggedUserId, targetUserId],
      },
    });

    if (!chat) return res.json(chat);

    res.json({
      data: chat?.messages,
      message: "messages fetched successfully.",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = chatRouter;
