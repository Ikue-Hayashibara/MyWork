const button = document.querySelector("#button");
const game = document.querySelector("#game");
const winner = document.querySelector("#message");
const playey1 = document.querySelector(".player1");
const player2 = document.querySelector(".player2");
button.style.display = "none";
let flag = true;
let fin = false;
let isTurn = true;

let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

function writeSymbol(flag, target) {
    const isPlayer = {true: "◯", false: "×"};
    const addColor = {
        "◯": (target) => target.classList.add("o"), 
        "×": (target) => target.classList.add("×"),
    };
    const symbolToNum = {"◯": 1, "×": -1};

    id = target.id;
    x = id[id.length - 1];
    y = id[id.length - 3];
    board[y][x] = symbolToNum[isPlayer[flag]];
    addColor[isPlayer[flag]](target);
    return isPlayer[flag];
};

function isGame(player) {
    for (let i = 0; i < board.length; i++) {
        if (Math.abs(board[i][0] + board[i][1] + board[i][2]) ==  3 ||
            Math.abs(board[0][i] + board[1][i] + board[2][i]) == 3) {
            winner.textContent = `${player}の勝利！！`;
            fin = true;
            return;
        }
    }

    if (Math.abs(board[0][0] + board[1][1] + board[2][2]) == 3 ||
        Math.abs(board[0][2] + board[1][1] + board[2][0]) == 3) {
        winner.textContent = `${player}の勝利！！`;
        fin = true;
        return;
    }

    if (!board.some(row => row.includes(0))) {
        winner.textContent = `引き分け！！`;
        fin = true;
    }
};

function cpuMove() {
    emptyCells = Array.from(game.querySelectorAll(".cell")).filter(cell => cell.textContent == "");
    targetCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    targetCell.textContent = writeSymbol(flag, targetCell);
    isTurn = true;
    
};

game.addEventListener("click", (e) => {
    if (isTurn && e.target.textContent == "") {
        isTurn = false;
        const player = {true: playey1.value, false: player2.value};
        e.target.textContent = writeSymbol(flag, e.target);
        isGame(player[flag]);
        setTimeout(() => {
            flag = !flag;
            cpuMove();
            flag = !flag;
            isGame(player[!flag])
        }, 1000);
        
        if (fin) {
            button.style.display = "block";
        }
        
    }
});

button.addEventListener("click", () => {
    window.location.reload(true);
});