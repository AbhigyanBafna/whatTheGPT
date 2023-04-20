# whatTheGPT

This is a webhook that can be used to talk to GPT externally, basically <b><i>AI anywhere!</i></b>

Developed using NextJS with an API endpoint accepting POST requests with a JSON payload in the body. The webhook is tailored for integration with Twilio but can be easily used for something else.

Anyways, keeping aside the jargon. Here is how you get <b>GPT on your whatsapp using this!</b>

S1) Clone the repo to local
```
git clone https://github.com/AbhigyanBafna/whatTheGPT.git
```
<br>

S2) Make an account and login on [openAI](https://platform.openai.com/) and [Twilio](https://www.twilio.com/login) <br>
<br>

S3) Get your - <br> 
TWILIO_ACCOUNT_SID & TWILIO_AUTH_TOKEN from Twilio <br>
OPENAI_API_KEY from openAI <br>
and insert them into an dotenv file at the root of your repository.
<br>

>Never Share your API KEYS
<br>

S4) Install Dependancies and run it locally to check everything is working.
```
npm install
npm run dev
```
<br>

S5) Host the project. I used vercel. (Good idea to get idea if you've never done this before --> [docs](https://vercel.com/docs/cli/deploy) )
```
npm i -g vercel
vercel --version
```
```
vercel build
vercel deploy --prebuilt
```
<br>

> The webhook is live!
<br>

S6) Head over to the Twilio Console and set up Messaging --> Try it out --> Send a Whatsapp Message. <br>
<br>

S7) After setting your sandbox. Go to webhooks and input the api endpoint of your url. It would be something like `your-url/api/message`
<br>

> Remember to keep your hosted webhook SAFE and PRIVATE as they can easily be misused to exhaust your Twilio/OpenAI usage.
<br>

Hope you enjoyed it :) and have an AI chatbot in your whatsapp. <br>
~[Abhi](https://twitter.com/Abhigyan_Bafna) out.
