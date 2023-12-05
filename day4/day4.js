import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\n" +
    "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\n" +
    "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\n" +
    "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\n" +
    "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\n" +
    "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11"

function extractNumbers(str) {
    return str.trim().split( /\s+/).map(nb => Number(nb))
}

function sumOfPoints(input){
    const lines = input.split("\n").map(line => line.split(':')[1])
    return lines.reduce((acc, line) => {
        const numberGames = line.split('|')
        const winningsNumbers = extractNumbers(numberGames[0])
        const numbers = extractNumbers(numberGames[1])

        const foundNumber = winningsNumbers.reduce((accNumber,winningNumber) => {
            if(numbers.includes(winningNumber)) accNumber.push(winningNumber)
            return accNumber
        },[])

        if(foundNumber.length > 0) return acc + Math.pow(2,foundNumber.length-1)
        return acc
    },0)
}

// console.log(sumOfPoints(input))

function sumOfCards(input){
    const lines = input.split("\n").map(line => line.split(':')[1])
    const cards = lines.reduce((acc, line, indexCard) => {
        const numberGames = line.split('|')
        const winningsNumbers = extractNumbers(numberGames[0])
        const numbers = extractNumbers(numberGames[1])

        const foundNumber = winningsNumbers.reduce((accNumber,winningNumber) => {
            if(numbers.includes(winningNumber)) accNumber.push(winningNumber)
            return accNumber
        },[])

        console.log({foundNumber, acc, ex:[...acc, ...foundNumber.map((val, idx) => (idx + indexCard + 2))]})

        if(foundNumber.length > 0) return [...acc, ...foundNumber.map((val,idx)=>(idx+indexCard+1))]
        return acc
    },[])
}

console.log(sumOfCards(inputExample))