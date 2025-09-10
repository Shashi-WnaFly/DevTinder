const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/request");
const sendEmail = require("./sendEmail");

cron.schedule("00 08 * * *", async () => {
  try {
    const prevDay = subDays(new Date(), 1);
    const prevDayStart = startOfDay(prevDay);
    const prevDayEnd = endOfDay(prevDay);

    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: prevDayStart,
        $lt: prevDayEnd,
      },
    }).populate("toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      const res = await sendEmail.run(
        "Pending friend request to " + email,
        "There are so many friend request are pending, please login and accept or reject."
      );
    }
  } catch (err) {
    console.log(err + "");
  }
});

module.exports = { cron };
