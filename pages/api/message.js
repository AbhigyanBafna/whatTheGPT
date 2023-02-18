export default function handler(req, res) {

    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    var messageResponse = new MessagingResponse();

    messageResponse.message('Reply goes here');
    // send response
    res.writeHead(200, {
    'Content-Type': 'text/xml'
    });

    res.end(messageResponse.toString());

    }