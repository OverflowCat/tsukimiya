export async function runCangjie(code: string) {
    const body = {
        code,
        type: "1",
    };
    const res = await fetch("https://cangjie-lang.cn/v1/cjc/codeHandle", {
        headers: {
            accept: "application/json, text/plain, */*",
            "accept-language":
                "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,zh-TW;q=0.5",
            "cache-control": "no-cache",
            "content-type": "application/json;charset=UTF-8",
            pragma: "no-cache",
            priority: "u=1, i",
            "sec-ch-ua": '"Not;A=Brand";v="24", "Chromium";v="128"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            Referer: "https://cangjie-lang.cn/playground",
            "Referrer-Policy": "unsafe-url",
        },
        body: JSON.stringify(body),
        method: "POST",
    });
    const json = await res.json();
    console.log(json);
    if (json.data) {
        return json.data;
    } else return "Failed";
}
