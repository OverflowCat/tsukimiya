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
    let code = splitCmd(text).at(-1)?.trim() ?? ""; //text.split(" ").slice(1).join(" ");
    console.info(text);
    if (!/fn +main/.test(code)) {
        lines = code.split("\n");
        const last_line = lines.at(-1);
        if (!/println/.test(last_line)) {
            lines[lines.length - 1] = `println(${last_line})`;
        }
        code = `fn main { ${lines.join("\n")} }`;
    }
    const result = await run(code);
    ctx.reply(result);
});

// bot.on("message", (ctx) => ctx.reply("Use /eval to evaluate code."));
bot.start();
