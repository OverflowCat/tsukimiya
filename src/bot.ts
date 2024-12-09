import { Bot, Context } from "grammy";
import { pre, fmt, hydrateReply } from "@grammyjs/parse-mode";
import { runMoonbit } from "./eval.js";
import { runCangjie } from "./cj.js";
import { ParseModeFlavor } from "@grammyjs/parse-mode";

const token = process.env.TSUKIMIYA_BOT_TOKEN;
const bot = new Bot<ParseModeFlavor<Context>>(token!);
bot.use(hydrateReply);

function splitCmd(str: string) {
    const index = str.search(/\s/);
    if (index !== -1) {
        const firstPart = str.slice(0, index);
        const secondPart = str.slice(index + 1);
        return [firstPart, secondPart];
    }
    return [str, ''];
}

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command(["eval", "mbt", "mb", "moon", "evalmbt"], async (ctx) => {
    if (!ctx.message) return;
    const text = ctx.message.text ?? ctx.message.caption ?? "";
    let input = splitCmd(text).at(-1)?.trim() ?? ""; //text.split(" ").slice(1).join(" ");
    console.info(text);
    if (!/fn +main/.test(input)) {
        let lines = input.split("\n");
        const last_line = lines.at(-1);
        if (!last_line) {
            return;
        }
        if (!/println/.test(last_line)) {
            lines[lines.length - 1] = `println(${last_line})`;
        }
        input = `fn main { ${lines.join("\n")} }`;
    }
    const result = await runMoonbit(input);
    await ctx.reply(result);
});

bot.command(["cj", "cangjie", "evalcj"], async (ctx) => {
    if (!ctx.message) return;
    const text = ctx.message.text ?? ctx.message.caption ?? "";
    let input = splitCmd(text).at(-1)?.trim() ?? ""; //text.split(" ").slice(1).join(" ");
    const result = await runCangjie(input);
    await ctx.replyFmt(fmt`${pre(result, "swift")}`);
});

// bot.on("message", (ctx) => ctx.reply("Use /eval to evaluate code."));
bot.start();
