const cron = require('node-cron');
const { formatDistance, subDays, previousDay } = require("date-fns");

cron.schedule("15 22 * * * *", async () => {
    const prevDay = subDays(new Date(), 1).getTime();
    

})

module.exports = {cron};