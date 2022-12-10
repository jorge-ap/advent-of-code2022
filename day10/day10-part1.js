// Personal data set
const inputCase = `addx 1
noop
addx 2
addx 11
addx -4
noop
noop
noop
noop
addx 3
addx -3
addx 10
addx 1
noop
addx 12
addx -8
addx 5
noop
noop
addx 1
addx 4
addx -12
noop
addx -25
addx 14
addx -7
noop
addx 11
noop
addx -6
addx 3
noop
addx 2
addx 22
addx -12
addx -17
addx 15
addx 2
addx 10
addx -9
noop
noop
noop
addx 5
addx 2
addx -33
noop
noop
noop
noop
addx 12
addx -9
addx 7
noop
noop
addx 3
addx -2
addx 2
addx 26
addx -31
addx 14
addx 3
noop
addx 13
addx -1
noop
addx -5
addx -13
addx 14
noop
addx -20
addx -15
noop
addx 7
noop
addx 31
noop
addx -26
noop
noop
noop
addx 5
addx 20
addx -11
addx -3
addx 9
addx -5
addx 2
noop
addx 4
noop
addx 4
noop
noop
addx -7
addx -30
noop
addx 7
noop
noop
addx -2
addx -4
addx 11
addx 14
addx -9
addx -2
noop
addx 7
noop
addx -11
addx -5
addx 19
addx 5
addx 2
addx 5
noop
noop
addx -2
addx -27
addx -6
addx 1
noop
noop
addx 4
addx 1
addx 4
addx 5
noop
noop
noop
addx 1
noop
addx 4
addx 1
noop
noop
addx 5
noop
noop
addx 4
addx 1
noop
addx 4
addx 1
noop
noop
noop
noop`;

const testCase1 = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

// Solution
const resolve = (input) => {
  const lines = input.split("\n");
  const cyclesToCheck = [20, 60, 100, 140, 180, 220];
  const valuesCycles = lines.reduce(
    (acc, line) => {
      const [command, value] = line.split(" ");
      if (line === "noop") {
        acc = { ...acc, cycles: (acc.cycles + 1) };
        if (cyclesToCheck.includes(acc.cycles)) {
          const i = cyclesToCheck.indexOf(acc.cycles);
          acc.signalStrengths[i] = acc.X * cyclesToCheck[i];
        }
      } else if (command === "addx") {
        const transformedValue = value.startsWith("-")
          ? -1 * parseInt(value.slice(1), 10)
          : parseInt(value, 10);
        acc = {
          ...acc,
          cycles: (acc.cycles += 2),
          X: acc.X + transformedValue,
        };
        if (
          cyclesToCheck.includes(acc.cycles) ||
          cyclesToCheck.includes(acc.cycles - 1)
        ) {
          const i = cyclesToCheck.indexOf(acc.cycles);
          const valueCycle = i !== -1 ? acc.X : acc.X - transformedValue;
          const index = i !== -1 ? i : cyclesToCheck.indexOf(acc.cycles - 1);
          acc.signalStrengths[index] = valueCycle * cyclesToCheck[index];
        }
      }
      return acc;
    },
    // Signal strengths at [20th, 60th, 100th, 140th, 180th, 220th] cycles
    { cycles: 1, X: 1, signalStrengths: [0, 0, 0, 0, 0, 0] }
  );
  console.log(valuesCycles.signalStrengths);
  return valuesCycles.signalStrengths.reduce((acc, value) => acc + value, 0);
};

// const test1 = resolve(testCase1);
const test1 = resolve(testCase1);

console.assert(test1 === 13140, "Test case 1 failed");

const output = resolve(inputCase);

console.log(`The solution is ${output}`);
