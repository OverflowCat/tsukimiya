import { Bot } from "grammy";
import { run } from "./eval.js";

const token = process.env.TSUKIMIYA_BOT_TOKEN;
const bot = new Bot(token);


function splitCmd(str) {
	    const index = str.search(/\s/);
	    if (index !== -1) {
		            const firstPart = str.slice(0, index);
		            const secondPart = str.slice(index + 1); 
		            return [firstPart, secondPart]; 
		        }
	    return [str, ''];
}

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("eval", async (ctx) => {
    const text = ctx.message.text ?? ctx.message.caption ?? "";
    const code = splitCmd(text).at(-1) ?? ""; //text.split(" ").slice(1).join(" ");
    console.info(text);
    const result = await run(code);
    ctx.reply(result);
});

// bot.on("message", (ctx) => ctx.reply("Use /eval to evaluate code."));
bot.start();
