import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = "...#......\n" +
    ".......#..\n" +
    "#.........\n" +
    "..........\n" +
    "......#...\n" +
    ".#........\n" +
    ".........#\n" +
    "..........\n" +
    ".......#..\n" +
    "#...#....."

function expandsEmptySpaces(input) {
    const lines = input.split('\n');
    let numbers = 0

    const emptyColumns = lines[0].split('').map((_, i) =>
        lines.every(line => line[i] === '.')
    );

    const expandsLines = []

    for (let line of lines) {
        line.match(/^\.+$/) ? expandsLines.push(...Array(2).fill(line)) : expandsLines.push(line)
    }

    return expandsLines.map(line => {
        const newLine = []
        for(let [i, char] of line.split('').entries()) {
            if (emptyColumns[i] && char !== '\n') newLine.push(...['.', char])
            else if (char === '#') {
                newLine.push(++numbers)
            } else {
                newLine.push(char)
            }
        }
        return newLine
    });
}

const expandSpace = expandsEmptySpaces(inputExample)
const numbers= new Map()

for (let i = 0; i < expandSpace.length; i++) {
    for (let j = 0; j < expandSpace[i].length; j++) {
        if (!isNaN(expandSpace[i][j])){
            numbers.set(expandSpace[i][j], {row:i, col:j})
        }
    }
}

function calculateDistance(map) {
    const distances = {};

    map.forEach((value1, key1) => {
        map.forEach((value2, key2) => {
            if (key1 !== key2) {
                const distance = Math.sqrt(
                    Math.pow(value2.row - value1.row, 2) + Math.pow(value2.col - value1.col, 2)
                );
                distances[`${key1}-${key2}`] = distance;
            }
        });
    });

    return distances;
}

console.log(numbers)

console.log(calculateDistance(numbers))

