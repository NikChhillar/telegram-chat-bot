const Telegram = require("node-telegram-bot-api");
const { Configuration, OpenAIApi } = require("openai");

require("dotenv").config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const OPENAI = process.env.OPENAI_KEY;

const config = new Configuration({
  apiKey: OPENAI,
});

const openai = new OpenAIApi(config);

const bot = new Telegram(BOT_TOKEN, { polling: true });

// on start
bot.onText(/\/start/, (m) => {
  bot.sendMessage(
    m.chat.id,
    "Welcome Human... Feel free to ask anything... Also have some extra knowledge which may not be of any use"
  );
});

// reply
bot.on("message", async (m) => {
  const chatID = m.chat.id;

  const reply = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Summarize this : \n${m.text} `,
    max_tokens: 500,
    temperature: 0.5,
  });

  bot.sendMessage(chatID, reply.data.choices[0].text);
});
