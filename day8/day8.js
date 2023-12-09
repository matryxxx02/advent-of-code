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

        if(currentKey === 'ZZZ') break
    }

    return steps

}

console.log(countStepsToZZZ(input))