import { Telegraf, Markup } from "telegraf";
import { format } from "date-fns";

const bot = new Telegraf("6416686728:AAHub_mGWXtEjUw6SHOb5gTZXEjm_hl3MX0");

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getCurrentDateTime = () => {
  const currentDate = new Date();
  return format(currentDate, "yyyy-MM-dd HH:mm:ss");
};

const getCoinSide = () => (getRandomInt(0, 1) === 0 ? "Heads" : "Tails");

const coinInlineKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Flip again", "flip_a_coin"),
]);

bot.action("flip_a_coin", async (ctx) => {
  await ctx.editMessageText(
    `${getCoinSide()}/nEdited: ${getCurrentDateTime()} `,
    coinInlineKeyboard
  );
});

bot.hears("Flip a coin", (ctx) => ctx.reply(getCoinSide(), coinInlineKeyboard));

const getRandomNumber = () => getRandomInt(0, 100);

const randomKeyboard = Markup.inlineKeyboard([
  Markup.button.callback("Generate number", "random_number"),
]);

bot.action("random_number", async (ctx) => {
  await ctx.editMessageText(
    `${getRandomNumber()}/nEdited: ${getCurrentDateTime()} `,
    randomKeyboard
  );
});

bot.hears("Random number", (ctx) =>
  ctx.reply(getRandomNumber(), randomKeyboard)
);

const replyKeyboard = Markup.keyboard([["Flip a coin"], ["Random number"]]);

bot.use(async (ctx) => {
  await ctx.reply("what to do?", replyKeyboard);
});

console.log("Bot is ready!");
bot.launch();
