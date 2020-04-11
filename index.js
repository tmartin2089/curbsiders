const axios = require('axios')
const cron = require('node-cron')

require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const TWILIONUMBER = process.env.TWILIO_PHONE;
const MYPHONE = process.env.MY_PHONE
const client = require('twilio')(accountSid, authToken);

const curbside = () => {
  return axios.get(process.env.MY_HEB)  
}

cron.schedule('* * * * *', () => {
	let found = false;
	console.log('running every minute', this);

	if(!found) {
		console.log('nothing found yet')
		curbside()
			.then(res => {
				found = true;
				messageTwilio(res.data.items.length)
			})
			.catch(err => {console.log(err)})
	}
});

function messageTwilio(times) {
	client.messages
		.create({
			body: `${times} curbside pickup times have been found`,
			from: TWILIONUMBER,
			to: MYPHONE
		})
		.then(message => console.log(message.sid))
		.catch(err => {console.log('errrrrrrorrrrr',err)})
}
