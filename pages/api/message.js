import { Configuration, OpenAIApi } from "openai";
import { storeConversation } from '../../utils/conversations';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openAI = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    const messageResponse = new MessagingResponse();

    const sentMessage = req.body.Body || '';
    let replyToBeSent = "";

    if (sentMessage.trim().length === 0) {
        replyToBeSent = "We could not get your message. Please try again";
    } else {
        try {
            const completion = await openAI.createCompletion({
                model: "gpt-3.5-turbo-instruct",
                prompt: req.body.Body,
                temperature: 0.5,
                n: 1,
            });

            replyToBeSent = removeIncompleteText(completion.data.choices[0].text);
        } catch (error) {
            if (error.response) {
                console.log(error.response)
                replyToBeSent = "There was an issue with the server";
            } else {
                replyToBeSent = "An error occurred during your request.";
            }
        }
    }

    messageResponse.message(replyToBeSent);

    // Store the conversation
    const user_id = req.body.From;
    await storeConversation(user_id, req.body.Body, replyToBeSent);

    // Send response
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(messageResponse.toString());
}

function removeIncompleteText(inputString) {
    const match = inputString.match(/\b\.\s\d+/g);
    const removeAfter = match ? inputString.slice(0, inputString.lastIndexOf(match[match.length - 1])) : inputString;
    return removeAfter;
}
