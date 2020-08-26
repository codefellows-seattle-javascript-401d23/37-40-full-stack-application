'use strict';

require('dotenv').config();

var accountSid = 'ACa11a6a4751c701a38d24ec97aa801c83';
var authToken = process.env.TWILIO_AUTH_TOKEN;

var client = require('twilio')(accountSid, authToken);

client.messages.create({
  body: 'breaking dawn...',
  from: '+13608420391',
  to: '+12067130375'
}).then(function (message) {
  return console.log(message.sid);
}) // eslint-disable-line
.done();