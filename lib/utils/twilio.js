const twilio = require('twilio');

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// twilioClient.messages.create -> Promise<to send an SMS>
const sendSms = (toParam, message) => {
  return twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to: toParam
  });
};

module.exports = { sendSms };
