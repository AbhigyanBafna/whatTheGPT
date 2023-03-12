import {openai} from "openai";

openai.apiKey = process.env.OPENAI_API_KEY

export default async function handler(req, res) {

    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    var messageResponse = new MessagingResponse();

    const model = "gpt-3.5-turbo";

    const prompt = req.body.Body || '';
    let replyToBeSent = "";

    if (sentMessage.trim().length === 0) {
        replyToBeSent = "We could not get your message. Please try again";
    } else {
            try {
                const completion = await openai.complete({
                engine: "text-davinci-002", // required
                prompt, // completion based on this
                temperature: 0.6, //
                n: 1,
                max_tokens: 150,
                // stop: "."
            });

            replyToBeSent = removeIncompleteText(completion.choices[0].text)

        } catch (error) {
            if (error.response) {
                replyToBeSent = error.response
            } else { // error getting response
                replyToBeSent = "An error occurred during your request.";
            }
        }
    }
    messageResponse.message(replyToBeSent);

    // send response
    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });

    res.end(messageResponse.toString());
}

//Removes the last sentance if it's being abruptly generated due to token limits.
function removeIncompleteText(inputString) {
    const match = inputString.match(/\b\.\s\d+/g);
    const removeAfter = match ? inputString.slice(0, inputString.lastIndexOf(match[match.length - 1])) : inputString;
    return removeAfter
}