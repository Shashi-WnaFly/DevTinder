const express = require("express");
const paymentRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const instance = require("../utils/razorpay");
const Payment = require("../models/payment");
const { subscriptionAmount } = require("../utils/constants");

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
    res.json({ ...savedPayment.toJSON() });
  } catch (error) {
    console.log(error);
  }
});

module.exports = paymentRouter;
