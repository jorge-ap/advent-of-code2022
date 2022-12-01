// Personal data set
const inputCase = `
`

// Provided test case
const testCase = `
`


// This can vary
const parseInput = (input) => input.split('\n').map(Number);

// Solution
const resolve = (input) => {

}

const parsedTest = parseInput(testCase);
const test = resolve(parsedTest);

console.assert(test === 'expectedSolution', 'Test case failed');

const parsedInput = parseInput(inputCase);
const output = resolve(parsedInput);

console.log(`The solution is ${output}`);