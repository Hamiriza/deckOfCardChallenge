const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("How many cards are there in the deck? ", function (size) {
  if (isNaN(size)) {
    console.log("You have not inputted a number");
  } else {
    console.log(
      `It will take ${calculate(
        size
      )} rounds to put the deck into its original order`
    );
  }

  rl.close();
});

function calculate(size) {
  let originalArray = Array.from({ length: size }, (undefined, i) => i);
  let changedArray = firstRound(originalArray);
  let result = 1;

  for (let i = 0; i < changedArray.length; i++) {
    let rotationRounds = 1;
    let rotate = i;

    while (changedArray[rotate] !== i) {
      rotate = changedArray[rotate];
      rotationRounds++;
    }

    result = lcm(result, rotationRounds);
  }

  return result;
}

function firstRound(array) {
  let table = [];
  let hand = [...array];
  while (hand.length > 1) {
    table.unshift(hand.shift());
    hand.push(hand.shift());
  }
  table.unshift(hand.shift());
  return table;
}

function gcd(a, b) {
  return b == 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

rl.on("close", function () {
  console.log("\nBYE BYE !!!");
  process.exit(0);
});
