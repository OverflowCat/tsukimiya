import puppeteer from "puppeteer";
const url = "http://127.0.0.1:5500/main.html"

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], });
const page = await browser.newPage();

await page.goto(url);

const document = await page.content();

const reset_btn = "button#reset-button";
const format_btn = "button#format-button";
const run_btn = "button#run-button";

console.info("Module initialized");

export function runMoonbit(code) {
    return page.evaluate(async (code, run_btn) => {
        globalThis.lastOutput = undefined;
        globalThis.setCode(code);
        const runButton = document.querySelector(run_btn);
        runButton.click();
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        while (undefined === globalThis.lastOutput) {
            await sleep(100);
            console.log("Waiting for result");
        }
        return globalThis.lastOutput;
    }, code, run_btn);
}

export function reset() {
    return page.evaluate(async (reset_btn) => {
        const resetButton = document.querySelector(reset_btn);
        resetButton.click();
    }, reset_btn);
}

export function format() {
    return page.evaluate(async (format_btn) => {
        const formatButton = document.querySelector(format_btn);
        formatButton.click();
    }, format_btn);
}

// const result = await run(`let y = 3
// fn foo(x: Int) -> Unit {
//   fn inc()  { x + 1 } // OK, will return x + 1
//   fn four() { y + 1 } // Ok, will return 4
//   println(inc())
//   println(four())
// }

// fn main {
//   foo(2)
// }
// `);
