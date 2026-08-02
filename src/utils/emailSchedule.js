const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const ConnectionRequest = require("../models/request");
const emailTransporter = require("../config/emailTransporter");
const { EMAIL_PENDING_REQUEST } = require("./constants");

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

    const set = new Set();
    const listOfUsers = [];

    pendingRequests.map((req) => {
      if(!set.has(req.toUserId.emailId)){
        listOfUsers.push(req);
        set.add(req.toUserId.emailId);
      }
    })

    let request_notify = EMAIL_PENDING_REQUEST.replace(
      "{{company_name}}",
      "TinderDev",
    ).replace("{{current_year}}", new Date().getFullYear());

    for (const user of listOfUsers) {
      request_notify = request_notify.replace("{{recipient_name}}", user.toUserId.name);
      await emailTransporter.sendMail({
        from: "noreply@tinderdev.co.in",
        to: user.toUserId.emailId,
        subject: "You have new connection requests",
        html: request_notify,
      });
    }

  } catch (err) {
    console.error(err);
  }
});

module.exports = { cron };
