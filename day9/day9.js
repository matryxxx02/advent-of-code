import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = "0 3 6 9 12 15\n" +
    "1 3 6 10 15 21\n" +
    "10 13 16 21 30 45"

function lagrangeInterpolation(x, y, nextX) {
    let result = 0;

    for (let i = 0; i < x.length; i++) {
        let term = y[i];

        for (let j = 0; j < x.length; j++) {
            if (j !== i) {
                term *= (nextX - x[j]) / (x[i] - x[j]);
            }
        }

        result += term;
    }

    return result;
}

function sumOfExtrapolated(input) {
    const lines = input.split('\n')
    return Math.round(lines.reduce((acc, line) => {
        const y = line.split(/\s+/).map(l => Number(l))
        const x = Array.from({ length: y.length }, (_, index) => index + 1);
        const res = lagrangeInterpolation(x, y, y.length+1)
        return acc + res
    },0))
}

console.log(sumOfExtrapolated(input))
