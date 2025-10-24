const express = require("express");
const paymentRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const instance = require("../utils/razorpay");
const Payment = require("../models/payment");
const User = require("../models/user");
const { subscriptionAmount } = require("../utils/constants");
const {
  validateWebhookSignature,
} = require("razorpay/dist/utils/razorpay-utils");
const payment = require("../models/payment");

paymentRouter.post("/payment/create", userAuth, async (req, res) => {
  try {
    const { subscriptionType } = req.body;
    const { firstName, lastName, emailId, _id } = req.user;

    const order = await instance.orders.create({
      amount: subscriptionAmount[subscriptionType] * 100,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        subscriptionType,
      },
    });

    const { id, status, amount, currency, receipt, notes } = order;

    const payment = new Payment({
      userId: _id,
      orderId: id,
      status,
      amount,
      currency,
      receipt,
      notes,
    });

    const savedPayment = await payment.save();
    res.json({ ...savedPayment.toJSON(), key: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.log(error);
  }
});

paymentRouter.post("/payment/webhook", async (req, res) => {
  try {
    const webhookSignature = req.get("X-Razorpay-Signature");
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );

    if (!isWebhookValid) {
      return res.status(400).json({ msg: "webhook signature is invalid!" });
    }

    const paymentDetails = req.body.payload.payment.entity;

    const payment = await Payment.findOne({
      orderId: paymentDetails.order_id,
    });

    if (req.body.event == "payment.captured") {
      payment.status = paymentDetails.status;

      await payment.save();

      const user = await User.findById({ _id: payment.userId });

      user.subscriptionType = payment.notes.subscriptionType;
      user.isPremium = true;
      await user.save();
    }
    if (req.body.event == "payment.failed") {
      payment.status = paymentDetails.status;
      await payment.save();
    }

    res.status(200).json({ msg: "webhook received successfully." });
  } catch (error) {
    console.log(error);
  }
});

module.exports = paymentRouter;
