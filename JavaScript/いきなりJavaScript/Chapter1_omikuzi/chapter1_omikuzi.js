const today = new Date();
const year = today.getFullYear();
const rackKind = ["大吉","中吉","吉","小吉","凶","大凶"];
const repeatNum = 100;
let count = 0
for (let i = 0; i < repeatNum; i++) {
    const rack = rackKind[Math.floor(Math.random() *  rackKind.length)];
    if (rack == "大吉") {
        console.log(`${year}年の運勢は…${rack}です`);
        count ++;
    }
}
console.log(`${repeatNum}年間で${count}回大吉でした`);
