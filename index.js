const readline = require("readline");

/*------------- Doubly linked list data structure -----------------*/
function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

function LinkedList(head, tail) {
  this.head = null;
  this.tail = null;

  this.addToHead = function (value) {
    let node = new Node(value, null, this.head);
    if (this.head) this.head.next = node;
    else this.tail = node;
    this.head = node;
  };

  this.addToTail = function (value) {
    let node = new Node(value, this.tail, null);
    if (this.tail) this.tail.prev = node;
    else this.head = node;
    this.tail = node;
  };

  this.removeHead = function () {
    if (!this.head) return null;
    let value = this.head.value;
    this.head = this.head.prev;
    if (this.head) this.head.next = null;
    return value;
  };

  this.removeTail = function () {
    if (!this.tail) return null;
    let value = this.tail.value;
    this.tail = this.tail.next;
    if (this.tail) this.tail.prev = null;
    return value;
  };

  this.search = function (value) {
    let current = this.head;
    while (current) {
      if (current.value == value) return value;
      current = current.prev;
    }
    return null;
  };

  this.indexOf = function (value) {
    let indexes = [];
    let current = this.tail;
    let index = 0;
    while (current) {
      if (current.value == value) indexes.push(index);
      current = current.next;
      index++;
    }
    return indexes;
  };

  this.findSize = function () {
    let node = this.tail;
    let res = 0;
    while (node !== null) {
      res++;
      node = node.next;
    }
    return res;
  };

  this.getElement = function (index) {
    let current = this.tail;
    let count = 0;

    while (current !== null) {
      if (count == index) return current.value;
      count++;
      current = current.next;
    }
    return null;
  };
}

/*-----------------------------------------------------------------*/

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
  let originalDeck = new LinkedList();

  for (let i = 0; i < size; i++) {
    originalDeck.addToHead(i);
  }

  let shuffledDeck = firstRound(originalDeck);
  let result = 1;

  for (let i = 0; i < shuffledDeck.findSize(); i++) {
    let rotationRounds = 1;
    let rotate = i;

    while (shuffledDeck.getElement(rotate) !== i) {
      rotate = shuffledDeck.getElement(rotate);
      rotationRounds++;
    }

    result = lcm(result, rotationRounds);
  }

  return result;
}

function firstRound(deck) {
  let table = new LinkedList();
  let hand = new LinkedList();
  let current = deck.tail;

  //copy the original deck to hand to prevent mutation
  while (current) {
    hand.addToHead(current.value);
    current = current.next;
  }

  //do a first round of shuffle
  while (hand.findSize() !== 0) {
    table.addToTail(hand.removeTail());
    hand.addToHead(hand.removeTail());
    if (hand.findSize() == 0) table.addToTail(hand.removeHead());
  }

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
