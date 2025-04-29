const button = document.querySelector("#button");
const output = document.querySelector("#output");
const input = document.querySelector("#name");
const hobbies = ["プログラミング", "筋トレ", "料理", "音楽鑑賞", "キャンプ"]
const skills = ["暗算", "早口言葉", "エレクトーン", "ペン回し", "俳句"]
button.addEventListener("click", () => {
    const hobbyNum = Math.floor(Math.random() * hobbies.length)
    const skillNum = Math.floor(Math.random() * hobbies.length)
    const message = `
     こんにちは、わたしの名前は${input.value}です。
     最近のハマりは${hobbies[hobbyNum]}で、特技は${skills[skillNum]}です。
     よろしくね`;
    output.textContent = message
})