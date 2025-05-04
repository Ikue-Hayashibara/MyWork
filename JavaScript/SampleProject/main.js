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
inputText.addEventListener("keydown", (e) => {
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
    
})

function setText(text) {
    // 漢字判定
    if (Object.keys(kanji).some(key => text.includes(key))) {
        text = text.split("").map( t => kanji[t] || t ).join("");
    }
    result = text.split("").map( t => kanaToRomaji[t][0] );
    showInput.textContent =  result.join("");
    resultChars = result.join("").split("");
}



