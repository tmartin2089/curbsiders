require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TWILIONUMBER = process.env.TWILIO_PHONE;
const MYPHONE = process.env.MY_PHONE
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'A curbside pickup time has been found!',
     from: TWILIONUMBER,
     to: MYPHONE
   })
  .then(message => console.log(message.sid))
  .catch(err => {console.log('errrrrrr',err)})