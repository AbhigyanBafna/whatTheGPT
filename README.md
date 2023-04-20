# whatTheGPT

This is a webhook that can be used to talk to GPT externally, basically <b><i>AI anywhere!</i></b>

Developed using NextJS with an API endpoint accepting POST requests with a JSON payload in the body. The webhook is tailored to Twilio(handles the frontend) cause I intended this to be a whatsapp chatbot.

Anyways, keeping aside the jargon. Here is how you replicate this for yourself!

S1) Clone the repo to local
```
git clone https://github.com/AbhigyanBafna/whatTheGPT.git
```
S2) Make an account and login on [openAI](https://platform.openai.com/) and [Twilio](https://www.twilio.com/login) <br>

S3) Get your - <br> 
TWILIO_ACCOUNT_SID & TWILIO_AUTH_TOKEN under API Keys and Tokens <br>
OPENAI_API_KEY under API Keys <br>
and insert them into an .env file at the root of your repo.

>Never Share your API KEYS

S4) 
