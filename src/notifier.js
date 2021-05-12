import mailjet from 'node-mailjet';

const sendNotification = (message) => {
  const { MAILJET_SMS_TOKEN, PHONE_NUMBER_TO } = process.env;

  const mailjetClient = mailjet.connect(MAILJET_SMS_TOKEN);

  const request = mailjetClient
    .post('sms-send', { 'version': 'v4' })
    .request({
      Text: message,
      To: PHONE_NUMBER_TO,
      From: 'MJPilot'
    })

  request
    .then((result) => { })
    .catch((err) => {
      console.log(err.statusCode)
    })
}

export default sendNotification;
