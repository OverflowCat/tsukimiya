import { Bot } from "grammy";
import { run } from "./eval.js";

const token = process.env.TSUKIMIYA_BOT_TOKEN;
const bot = new Bot(token);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("eval", async (ctx) => {
    const code = ctx.message.text.split(" ").slice(1).join(" ");
    const result = await run(code);
    ctx.reply(result);
});

bot.on("message", (ctx) => ctx.reply("Use /eval to evaluate code."));
bot.start();