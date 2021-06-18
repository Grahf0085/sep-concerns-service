const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// twilioClient.messages.create -> Promise<to send an SMS>
const sendSms = (to, message) => {
  return twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to: '707-599-2213',
  });
};

module.exports = { sendSms };
