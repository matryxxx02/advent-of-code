import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = "LLR\n" +
    "\n" +
    "AAA = (BBB, BBB)\n" +
    "BBB = (AAA, ZZZ)\n" +
    "ZZZ = (ZZZ, ZZZ"

function getMapAndInstruction(input) {
    const lines = input.split('\n')
    const instructions = lines[0].split('')
    const map = {}
    lines.splice(0,2)

    for(let line of lines) {
        const [key, values] = line.split("=")
        const [L, R] = values.replace(/ /g, '').replace(/\(|\)/g, '').split(',');
        map[key.replace(/ /g, '')] = {L, R}
    }

    return {instructions, map}
}

function countStepsToZZZ(input) {
    const {instructions, map} = getMapAndInstruction(input)
    let steps = 0
    let currentKey = 'AAA'

    while(currentKey !== 'ZZZ') {
        const instruction = instructions[steps % instructions.length];
        currentKey = map[currentKey][instruction];
        steps++;

    }

    return steps

}

// console.log(countStepsToZZZ(input))

const inputP2 = readInputFile('./inputPart2.txt')
const inputExampleP2 = "LR\n" +
    "\n" +
    "11A = (11B, XXX)\n" +
    "11B = (XXX, 11Z)\n" +
    "11Z = (11B, XXX)\n" +
    "22A = (22B, XXX)\n" +
    "22B = (22C, 22C)\n" +
    "22C = (22Z, 22Z)\n" +
    "22Z = (22B, 22B)\n" +
    "XXX = (XXX, XXX)"

function countStepsToZZZPart2(input) {
    const {instructions, map} = getMapAndInstruction(input)
    let steps = 0
    let currentKeys = Object.keys(map).filter(key => key.includes('A'))

    console.log({currentKeys})

    while(currentKeys.filter(key => key.endsWith("Z")).length !== currentKeys.length) {
        const instruction = instructions[steps % instructions.length];

        currentKeys = currentKeys.map(key => (map[key][instruction]))
        console.log({currentKeys})
        steps++;

    }

    return steps

}

console.log(countStepsToZZZPart2(inputP2))
