// Personal data set
const inputCase = `Monkey 0:
Starting items: 83, 97, 95, 67
Operation: new = old * 19
Test: divisible by 17
  If true: throw to monkey 2
  If false: throw to monkey 7

Monkey 1:
Starting items: 71, 70, 79, 88, 56, 70
Operation: new = old + 2
Test: divisible by 19
  If true: throw to monkey 7
  If false: throw to monkey 0

Monkey 2:
Starting items: 98, 51, 51, 63, 80, 85, 84, 95
Operation: new = old + 7
Test: divisible by 7
  If true: throw to monkey 4
  If false: throw to monkey 3

Monkey 3:
Starting items: 77, 90, 82, 80, 79
Operation: new = old + 1
Test: divisible by 11
  If true: throw to monkey 6
  If false: throw to monkey 4

Monkey 4:
Starting items: 68
Operation: new = old * 5
Test: divisible by 13
  If true: throw to monkey 6
  If false: throw to monkey 5

Monkey 5:
Starting items: 60, 94
Operation: new = old + 5
Test: divisible by 3
  If true: throw to monkey 1
  If false: throw to monkey 0

Monkey 6:
Starting items: 81, 51, 85
Operation: new = old * old
Test: divisible by 5
  If true: throw to monkey 5
  If false: throw to monkey 1

Monkey 7:
Starting items: 98, 81, 63, 65, 84, 71, 84
Operation: new = old + 3
Test: divisible by 2
  If true: throw to monkey 2
  If false: throw to monkey 3`;

// Provided test case
const testCase = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const startingItems = /^Starting items: \d+/;
const operationRE = /^Operation: \w+/;
const divisibleByRE = /^Test: divisible by \d+/;
const ifTrueRE = /^  If true: throw to monkey \d+/;
const ifFalseRE = /^  If false: throw to monkey \d+/;

// Solution
const parseData = (input) => {
  return input.split("\n\n").reduce((acc, monkey) => {
    // Monkey name not necessary
    const [_, ...operations] = monkey.split("\n");
    let items;
    let divisibleBy;
    let op;
    let ifTrue;
    let ifFalse;
    operations.map((operation) => {
      if (startingItems.test(operation)) {
        items = operation.match(/\d+/g).map(Number);
      } else if (operationRE.test(operation)) {
        op = operation.match(/\w+|[+-]|\*/g).slice(2);
      } else if (divisibleByRE.test(operation)) {
        divisibleBy = operation.match(/\d+/g).map(Number);
      } else if (ifTrueRE.test(operation)) {
        ifTrue = operation.match(/\d+/g).map(Number);
      } else if (ifFalseRE.test(operation)) {
        ifFalse = operation.match(/\d+/g).map(Number);
      }
    });
    acc.push(
      {
        items,
        op,
        divisibleBy,
        ifTrue,
        ifFalse,
      },
    );
    // console.log(acc.arrayMonkeys);
    return acc;
  }, []);
};

const resolve = (input) => {
  const monkeys = parseData(input);
  const evaluatedItems = Array(monkeys.length).fill(0);
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < monkeys.length; j++) {
      const actualMonkey = monkeys[j];
      const { items, op, divisibleBy, ifTrue, ifFalse } = actualMonkey;
      items.map((item) => {
        let newItem;
        const secondOp = op[2] === 'old' ? item : parseInt(op[2])
        if (op[1] === "*") {
          newItem = item * secondOp;
        } else if (op[1] === "+") {
          newItem = item + secondOp;
        } else if (op[1] === "-") {
          newItem = item - secondOp;
        }
        newItem = Math.floor(newItem / 3);
        if (newItem % divisibleBy === 0) {
          monkeys[ifTrue].items.push(newItem);
        } else {
          monkeys[ifFalse].items.push(newItem);
        }
        evaluatedItems[j] += 1;
      });
      actualMonkey.items = [];
    }
  }
  const sorted = evaluatedItems.sort((a, b) => b - a);
  return sorted[0] * sorted[1];
};

const test = resolve(testCase);

console.assert(test === 10605, "Test case failed");

const output = resolve(inputCase);

console.log(`The solution is ${output}`);
