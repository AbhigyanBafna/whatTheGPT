# whatTheGPT

This is a webhook which can be used to get replies from an AI model, more specifically `gpt-3.5-turbo`

The webhook is tailored for integration with Twilio to recieve messages on Whatsapp but can be easily used for something else. In my current implementation it also stores 1 previous message pair in a MongoDB database for better response generation.

Anyways, here is how you get it on your Whatsapp!</b>

1) Clone the repo to local
```
git clone https://github.com/AbhigyanBafna/whatTheGPT.git
```
<br>

2) If you haven't already, Sign Up on the following services -<br>
[openAI](https://platform.openai.com/), 
[Twilio](https://www.twilio.com/login),
[MongoDB](https://account.mongodb.com/account/register?signedOut=true) <br>
<br>

3.1) Get your SID and Auth Token from [Twilio](https://console.twilio.com/us1/account/keys-credentials/api-keys) (3.1 is an optional step)<br> 
TWILIO_ACCOUNT_SID <br>
TWILIO_AUTH_TOKEN <br> 

3.2) OPENAI_API_KEY from [openAI](https://platform.openai.com/account/api-keys) <br>

3.3) MONGO_URI from [mongoDB](https://cloud.mongodb.com/) <br>

<b>Note</b> - You need to create a cluster, a database and a collection to get your URI. After getting everything insert them into an dotenv file at the root of your repository. <br>
The database and collection names that I've used are `gptStore` and `conversations`



>Never SHARE your API KEYS

<br>

4) Install the dpendancies, run it locally and check the /api/message route.
```
npm install
npm run dev
```
<br>

5) Host the project. I used vercel. (Its a good idea to get an idea if you've never done this before --> [docs](https://vercel.com/docs/cli/deploy) )
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

6) Head over to the Twilio Console and set up Messaging --> Try it out --> Send a Whatsapp Message. <br>
<br>

7) After setting your sandbox. Go to webhooks and input the api endpoint of your url. It would be something like `your-url/api/message`
<br>

> Remember to keep your hosted webhook SAFE and PRIVATE as they can easily be misused to exhaust your Twilio or OpenAI usage.
<br>

Hope you enjoyed it and have an AI model in your DMs now! <br>

~[Abhi](https://twitter.com/Abhigyan_Bafna) out :)
