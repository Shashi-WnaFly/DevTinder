var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "ap-south-1" });

// Create sendEmail params
var params = {
  Destination: {
    /* required */
    CcAddresses: [
      "EMAIL_ADDRESS",
      /* more items */
      "shashi@tinderdev.club"
    ],
    ToAddresses: [
        "EMAIL_ADDRESS",
        /* more items */
        "shshianand2600@gmail.com"
        
    ],
  },
  Message: {
    /* required */
    Body: {
      /* required */
      Html: {
        Charset: "UTF-8",
        Data: <h1>This is the body of ses email</h1>,
      },
      Text: {
        Charset: "UTF-8",
        Data: "Hey! Now u r our client. Please any thing you feel feedback us sir/madam",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "Test email",
    },
  },
  Source: "SENDER_EMAIL_ADDRESS" /* required */,
  ReplyToAddresses: [
    "EMAIL_ADDRESS",
    /* more items */
  ],
};

// Create the promise and SES service object
var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
  .sendEmail(params)
  .promise();

// Handle promise's fulfilled/rejected states
sendPromise
  .then(function (data) {
    console.log(data.MessageId);
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
// snippet-end:[ses.JavaScript.email.sendEmail]