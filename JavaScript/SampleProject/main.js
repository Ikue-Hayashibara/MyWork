const question = document.querySelector("#question");
const showInput = document.querySelector("#showInput");
const correct = document.querySelector("#correct")
const inputText = document.querySelector("#inputText");
const correctSound = document.querySelector("#correctSound");
const misSound = document.querySelector("#misSound");
let text = questions[Math.floor(Math.random() * questions.length)];
let enterd = [];
let resultChars = [];
question.textContent = text;
let result = "";
setText(text);

document.body.addEventListener("click", function() {
    inputText.focus();
});

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
    }

    if (resultChars.length == 0) {
        enterd = [];
        text = questions[Math.floor(Math.random() * questions.length)];
        question.textContent = text;
        setText(text); 
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
