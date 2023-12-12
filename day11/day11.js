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

function calculateDistance(map) {
    const distances = {};
    map.forEach((value1, key1) => {
        map.forEach((value2, key2) => {
            if (key1 < key2) {
                distances[`${key1}-${key2}`] = (Math.abs(value2.col-value1.col)) + Math.abs(value2.row-value1.row)
            }
        });
    });

    return distances;
}


function shortestPathBetweenPairs(input) {
    const numbers= new Map()
    const expandSpace = expandsEmptySpaces(input)
    for (let i = 0; i < expandSpace.length; i++) {
        for (let j = 0; j < expandSpace[i].length; j++) {
            if (!isNaN(expandSpace[i][j])){
                numbers.set(expandSpace[i][j], {row:i, col:j})
            }
        }
    }
    const distMap = calculateDistance(numbers)

    return Object.values(calculateDistance(numbers)).reduce((acc, val) => acc+val,0)
}

console.log(shortestPathBetweenPairs(input))

