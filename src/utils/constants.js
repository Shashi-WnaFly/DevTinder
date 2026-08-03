export const subscriptionAmount = {
  silver: "499",
  gold: "799",
};

export const EMAIL_VERIFY_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Email Verify</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Verify your email
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          You are just one step away to verify your account for this email: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use below OTP to verify your account.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          This OTP is valid for 30 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>

`;

export const PASSWORD_RESET_TEMPLATE = `

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
  <title>Password Reset</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" type="text/css">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      font-family: 'Open Sans', sans-serif;
      background: #E5E5E5;
    }

    table, td {
      border-collapse: collapse;
    }

    .container {
      width: 100%;
      max-width: 500px;
      margin: 70px 0px;
      background-color: #ffffff;
    }

    .main-content {
      padding: 48px 30px 40px;
      color: #000000;
    }

    .button {
      width: 100%;
      background: #22D172;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      color: #fff;
      font-size: 14px;
      text-align: center;
      font-weight: bold;
      border-radius: 7px;
    }

    @media only screen and (max-width: 480px) {
      .container {
        width: 80% !important;
      }

      .button {
        width: 50% !important;
      }
    }
  </style>
</head>

<body>
  <table width="100%" cellspacing="0" cellpadding="0" border="0" align="center" bgcolor="#F6FAFB">
    <tbody>
      <tr>
        <td valign="top" align="center">
          <table class="container" width="600" cellspacing="0" cellpadding="0" border="0">
            <tbody>
              <tr>
                <td class="main-content">
                  <table width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tbody>
                      <tr>
                        <td style="padding: 0 0 24px; font-size: 18px; line-height: 150%; font-weight: bold;">
                          Forgot your password?
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          We received a password reset request for your account: <span style="color: #4C83EE;">{{email}}</span>.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 16px; font-size: 14px; line-height: 150%; font-weight: 700;">
                          Use the OTP below to reset the password.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 24px;">
                          <p class="button" >{{otp}}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 0 0 10px; font-size: 14px; line-height: 150%;">
                          The password reset otp is only valid for the next 30 minutes.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>
</html>
`;

export const EMAIL_PENDING_REQUEST = `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>You have new connection requests</title>
    <!-- Replace the {{placeholders}} before sending. -->
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
    <div style="display:none; max-height:0; overflow:hidden; opacity:0; mso-hide:all;">
      You have {{pending_request_count}} connection requests waiting for you.
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f6f8;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="padding:28px 40px; background-color:#0f766e;">
                <a href="{{website_url}}" style="font-size:22px; font-weight:bold; color:#ffffff; text-decoration:none;">{{company_name}}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:40px 40px 16px;">
                <h1 style="margin:0 0 16px; font-size:28px; line-height:36px; color:#111827;">Your network is waiting</h1>
                <p style="margin:0; font-size:16px; line-height:24px;">Hi {{recipient_name}},</p>
                <p style="margin:20px 0 0; font-size:16px; line-height:24px;">
                  You have <strong>connection requests</strong> waiting for your response on {{company_name}}.
                </p>
                <p style="margin:16px 0 0; font-size:16px; line-height:24px;">
                  Review the requests to grow your network and stay connected with people who want to know you.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:24px 40px 40px;">
                <a href="{{connection_requests_url}}" style="display:inline-block; padding:14px 24px; background-color:#0f766e; border-radius:6px; color:#ffffff; font-size:16px; font-weight:bold; text-decoration:none;">Review connection requests</a>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 40px; border-top:1px solid #e5e7eb;">
                <p style="margin:0; font-size:13px; line-height:20px; color:#6b7280;">
                  You received this email because you have pending connection requests on {{company_name}}. You can manage email preferences in your <a href="{{notification_settings_url}}" style="color:#0f766e; text-decoration:underline;">notification settings</a>.
                </p>
                <p style="margin:12px 0 0; font-size:13px; line-height:20px; color:#6b7280;">© {{current_year}} {{company_name}}. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

export const CONTACT_US_EMAIL = `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>New contact form submission</title>
    <!-- Replace the {{placeholders}} with your email service variables. -->
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f6f8;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px; background-color:#ffffff; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="padding:28px 40px; background-color:#0f766e;">
                <a href="{{website_url}}" style="font-size:22px; font-weight:bold; color:#ffffff; text-decoration:none;">{{company_name}}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:40px;">
                <h1 style="margin:0 0 12px; font-size:26px; line-height:34px; color:#111827;">New message from your website</h1>
                <p style="margin:0 0 28px; font-size:16px; line-height:24px; color:#4b5563;">A visitor has contacted {{company_name}}.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #e5e7eb; border-radius:8px;">
                  <tr>
                    <td style="width:130px; padding:14px 16px; border-bottom:1px solid #e5e7eb; background-color:#f9fafb; font-size:14px; font-weight:bold; color:#374151;">Name</td>
                    <td style="padding:14px 16px; border-bottom:1px solid #e5e7eb; font-size:15px; line-height:22px; color:#111827;">{{user_name}}</td>
                  </tr>
                  <tr>
                    <td style="width:130px; padding:14px 16px; border-bottom:1px solid #e5e7eb; background-color:#f9fafb; font-size:14px; font-weight:bold; color:#374151;">Email</td>
                    <td style="padding:14px 16px; border-bottom:1px solid #e5e7eb; font-size:15px; line-height:22px;"><a href="mailto:{{user_email}}" style="color:#0f766e; text-decoration:underline;">{{user_email}}</a></td>
                  </tr>
                  <tr>
                    <td style="width:130px; padding:14px 16px; border-bottom:1px solid #e5e7eb; background-color:#f9fafb; font-size:14px; font-weight:bold; color:#374151;">Subject</td>
                    <td style="padding:14px 16px; border-bottom:1px solid #e5e7eb; font-size:15px; line-height:22px; color:#111827;">{{subject}}</td>
                  </tr>
                  <tr>
                    <td valign="top" style="width:130px; padding:14px 16px; background-color:#f9fafb; font-size:14px; font-weight:bold; color:#374151;">Message</td>
                    <td style="padding:14px 16px; font-size:15px; line-height:24px; color:#111827; white-space:pre-line;">{{message}}</td>
                  </tr>
                </table>

                <p style="margin:28px 0 0; font-size:14px; line-height:22px; color:#6b7280;">Reply directly to this email or use the sender's email address above.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px; border-top:1px solid #e5e7eb; font-size:12px; line-height:18px; color:#6b7280;">This notification was sent from the {{company_name}} website contact form.</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
