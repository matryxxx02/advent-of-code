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
    const emptyRows= [];
    const expandsLines = []

    for (let line of lines) {
        if(line.match(/^\.+$/)) {
            expandsLines.push(line)
            emptyRows.push(true)
        } else {
            expandsLines.push(line)
            emptyRows.push(false)
        }
    }

    const galaxies = expandsLines.map(line => {
        const newLine = []
        for(let [i, char] of line.split('').entries()) {
            if (emptyColumns[i] && char !== '\n'){
                newLine.push(char)
            } else if (char === '#') {
                newLine.push(++numbers)
            } else {
                newLine.push(char)
            }
        }
        return newLine
    });
    return {galaxies, emptyColumns, emptyRows}
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


function shortestPathBetweenPairs(input, expandBy) {
    const numbers= new Map()
    const {galaxies, emptyRows, emptyColumns} = expandsEmptySpaces(input)

    for (let rowIdx = 0; rowIdx < galaxies.length; rowIdx++) {
        for (let colIdx = 0; colIdx < galaxies[rowIdx].length; colIdx++) {
            if (!isNaN(galaxies[rowIdx][colIdx])){
                numbers.set(galaxies[rowIdx][colIdx], {
                    row:rowIdx + emptyRows.filter((empty, idx) => empty && idx < rowIdx).length * expandBy,
                    col:colIdx + emptyColumns.filter((empty, idx) => empty && idx < colIdx).length * expandBy
                })
            }
        }
    }

    return Object.values(calculateDistance(numbers)).reduce((acc, val) => acc+val,0)
}

console.log(shortestPathBetweenPairs(input, 999999))