import axios from 'axios';
import { Configuration, OpenAIApi } from "openai";
import { storeConversation, getConversation } from '../../utils/conversations';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openAI = new OpenAIApi(configuration);

export default async function handler(req, res) {
    const MessagingResponse = require('twilio').twiml.MessagingResponse;
    const messageResponse = new MessagingResponse();

    let replyToBeSent = "";  // Initialize with an empty string

    const user_id = req.body.From;
    const previousConversations = await getConversation(user_id);

    let messages = previousConversations.flatMap(conv => [
        { 
            role: 'user', 
            content: conv.message 
        },
        { 
            role: 'assistant', 
            content: conv.response 
        }
    ]);
    
    // Add the current user message
    messages.push({ role: 'user', content: req.body.Body });
    
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.7  // Adjust as per your requirements
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
    
        replyToBeSent = response.data.choices[0].message.content.trim();

        if (replyToBeSent.startsWith("Model:")) {
            replyToBeSent = replyToBeSent.replace("Model:", "").trim();
        }
        
        await storeConversation(user_id, req.body.Body, replyToBeSent);

    } catch (error) {
        console.error(error);
        if (error.response) {
            replyToBeSent = `Server Error: ${error.response.data.error.message}`;
        } else {
            replyToBeSent = "An error occurred during your request.";
        }
    }

    messageResponse.message(replyToBeSent);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(messageResponse.toString());
}
