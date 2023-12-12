import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = ".....\n" +
    ".S-7.\n" +
    ".|.|.\n" +
    ".L-J.\n" +
    "....."

const directions = {
    "|" : ["H", "B"],
    "-" : ["G", "D"],
    "L" : ["H", "D"],
    "J" : ["H", "G"],
    "7" : ["G", "B"],
    "F" : ["D", "B"],
    "S" : ["H", "B", "D", "G"],
    "." : []
}

const obj = {
    "H": [ "|",  "7", "F"],
    "D": [ "-",  "J", "7"],
    "B": [ "|",  "L", "J"],
    "G": [ "-",  "L", "F"]
}

function findStart(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 'S') {
                return { row: i, col: j };
            }
        }
    }
}

function countSteps(input) {
    const lines = input.split("\n").map(line => line.split(''))
    let steps = 1
    let {row, col} = findStart(lines)
    let findChar = false
    let currentPipe = 'S'
    let previousDirection = ""

    while(!findChar) {
        switch(true) {
            //droite
            case (col < lines[row].length-1 && directions && directions[lines[row][col + 1]] && previousDirection !== "G" && directions[currentPipe].includes("D")  && obj["D"].includes(lines[row][col + 1])) :
                previousDirection = "D"
                col++
                break
            // bas
            case (row < lines.length-1 && directions[lines[row + 1][col]] && previousDirection !== "H" && directions[currentPipe].includes("B")  && obj["B"].includes(lines[row + 1][col])) :
                previousDirection = "B"
                row++
                break
            //gauche
            case (col > 0 && directions[lines[row][col - 1]] && previousDirection !== "D" && directions[currentPipe].includes("G")  && obj["G"].includes(lines[row][col - 1])) :
                previousDirection = "G"
                col--
                break
            //haut
            case (row > 0 && directions[lines[row - 1][col]] && previousDirection !== "B" && directions[currentPipe].includes("H")  && obj["H"].includes(lines[row - 1][col])) :
                previousDirection = "H"
                row--
                break
            default:
                console.log("DEFAULT", {currentPipe, steps})
                return steps / 2
        }
        currentPipe = lines[row][col]
        steps++
        // console.log({currentPipe, steps, previousDirection, row, col})
        if(currentPipe === "S") findChar = true

    }

    return steps / 2
}

console.log(countSteps(inputExample))