import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = "Time:      7  15   30\n" +
    "Distance:  9  40  200"

console.time('monMinuteur');
function extractNumbers(str) {
    return str.trim().split( /\s+/).map(nb => Number(nb))
}

function getCourses(input) {
    const lines = input.split('\n')
    const times = extractNumbers(lines[0].split(':')[1])
    const distances = extractNumbers(lines[1].split(':')[1])
    // console.log({times, distances})

    return times.map((time, index) => ({time, distance: distances[index]}))
}

function waysNumberToBeatRecord(input) {
    const courses = getCourses(input)
    const waysNumber = []

    for (const {time, distance} of courses) {
        const recordBreakingDistance = []
        for(let holdTime = 0; holdTime < time; holdTime++) {
            const recordDistance = (time - holdTime) * holdTime
            if(recordDistance > distance) recordBreakingDistance.push(recordDistance)
        }
        waysNumber.push(recordBreakingDistance.length)
    }

    return waysNumber.reduce((acc, nb) => acc*nb, 1)
}

console.log(waysNumberToBeatRecord(input))
console.timeEnd('monMinuteur');