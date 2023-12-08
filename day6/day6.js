import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = "Time:      71530\n" +
    "Distance:  940200"

console.time('monMinuteur');
function extractNumbers(str) {
    return str.trim().split( /\s+/).map(nb => Number(nb))
}

function getCourses(input) {
    const lines = input.split('\n')
    const times = extractNumbers(lines[0].split(':')[1])
    const distances = extractNumbers(lines[1].split(':')[1])

    return times.map((time, index) => ({time, distance: distances[index]}))
}

function getCoursesPart2(input) {
    const lines = input.split('\n')
    const times = [Number(extractNumbers(lines[0].split(':')[1]).join(''))]
    const distances = [Number(extractNumbers(lines[1].split(':')[1]).join(''))]

    return times.map((time, index) => ({time, distance: distances[index]}))
}

function waysNumberToBeatRecord(input) {
    console.time('parser')
    // const courses = getCourses(input)
    const courses = getCoursesPart2(input)
    console.timeEnd('parser')
    console.log(courses)
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