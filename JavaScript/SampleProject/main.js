const question = document.querySelector("#question");
const showInput = document.querySelector("#showInput");
const correct = document.querySelector("#correct")
const inputText = document.querySelector("#inputText");
const correctSound = document.querySelector("#correctSound");
const misSound = document.querySelector("#misSound");
const start = document.querySelector("#start");
const startButton = document.querySelector("#startButton");
const contents = document.querySelector("#contents");
const countdown = document.querySelector("#countdown");
const finish = document.querySelector("#finish");
const misTypeText = document.querySelector("#misTypeText");

contents.style.display = "none";
countdown.style.display = "none";
finish.style.display = "none";
let text = "";
let enterd = [];
let resultChars = [];
let result = "";
let count = 0;
let countMax = 5;
let misTypeCount = 0;
let isGame = false;

document.addEventListener("keydown", function(e) {
    if (!isGame && e.code === "Space") {
            isGame = true;
            start.style.display = "none";
            startCountdown(() => {
            contents.style.display = "block";
            text = questions[Math.floor(Math.random() * questions.length)];
            question.textContent = text;
            setText(text);
            inputText.focus();
        });
    }
});

// startButton.addEventListener("click", function() {
//     start.style.display = "none";
//     startCountdown(() => {
//         contents.style.display = "block";
//         text = questions[Math.floor(Math.random() * questions.length)];
//         question.textContent = text;
//         setText(text);
//         inputText.focus();
//     });
// });

inputText.addEventListener("keydown", (e) => {
    if (e.key === "Escape"){
        inputText.blur();
        return
    }

    e.preventDefault();
    inputText.value = "";

    if (e.key === resultChars[0]) {
        resultChars.shift();
        enterd.push(e.key);
        correctSound.currentTime = 0;
        correctSound.play();
    } else {
        misSound.currentTime = 0;
        misSound.play();
        misTypeCount++;
    }

    if (resultChars.length == 0) {
        count++;
        if (count < countMax) {
            enterd = [];
            text = questions[Math.floor(Math.random() * questions.length)];
            question.textContent = text;
            setText(text); 
        } else {
            contents.style.display = "none";
            finish.style.display = "block";
            misTypeText.textContent = `ミスタイプ： ${misTypeCount}`;
            return;
        }
        
    }
    correct.textContent = enterd.join("");
    showInput.textContent = resultChars.join("");
    
});

function setText(text) { 
    const regex = /^[\u4E00-\u9FFF]+$/;
    let splited = text.split("");

    // 漢字判定
    if (Object.keys(kanji).some(key => text.includes(key))) {
        let chars = [];
        splited.forEach(s => {
            if (regex.test(chars[chars.length - 1]) && regex.test(s)) {
                chars[chars.length - 1] += s;
            } else {
                chars.push(s);
            }
        })
        splited = chars.map( t => kanji[t] || t ).join("").split("");
    }

    // カタカナ判定
    if (splited.some(s => /^[ァ-ンー]$/.test(s))) {
        let chars = [];
        splited.forEach(s => {
            if(splited.some(s => /^[ァ-ンー]$/.test(s))) {
                chars.push(normalizeKana(s));
            } else {
                chars.push(s);
            }
        })
        splited = chars;
    };
    
    // 拗音判定
    if (Object.keys(contractedSound).some(key => splited.includes(key))) {
        let chars = [];
        splited.forEach(s => {
            if (chars[chars.length - 1] == "っ") {
                chars[chars.length - 1] += s;
            } else if (Object.keys(contractedSound).includes(s) && s != "っ") {
                chars[chars.length - 1] += s;
            } else {
                chars.push(s);
            }
        })
        splited = chars;
    }

    result = splited.map( t => t[0] == "っ" ? normalizeContracted(t) : kanaToRomaji[t][0]);
    showInput.textContent =  result.join("");
    resultChars = result.join("").split("");
};

function normalizeKana(char) {
    return char.replace(/[ァ-ン]/g, ch => 
        String.fromCharCode(ch.charCodeAt(0) - 0x60)
    );
};

function normalizeContracted(char) {
    return kanaToRomaji[char[1]][0][0] + kanaToRomaji[char[1]][0];
};

function startCountdown(callback) {
    countdown.style.display = "block";
    let count = 3;
    countdown.textContent = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdown.textContent = count;
        } else if (count === 0) {
            countdown.textContent = "START!";
        } else {
            clearInterval(interval);
            countdown.style.display = "none";
            callback(); // カウントダウンが終わったら、処理
        }
    }, 1000);
};
