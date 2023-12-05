import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = "seeds: 79 14 55 13\n" +
    "\n" +
    "seed-to-soil map:\n" +
    "50 98 2\n" +
    "52 50 48\n" +
    "\n" +
    "soil-to-fertilizer map:\n" +
    "0 15 37\n" +
    "37 52 2\n" +
    "39 0 15\n" +
    "\n" +
    "fertilizer-to-water map:\n" +
    "49 53 8\n" +
    "0 11 42\n" +
    "42 0 7\n" +
    "57 7 4\n" +
    "\n" +
    "water-to-light map:\n" +
    "88 18 7\n" +
    "18 25 70\n" +
    "\n" +
    "light-to-temperature map:\n" +
    "45 77 23\n" +
    "81 45 19\n" +
    "68 64 13\n" +
    "\n" +
    "temperature-to-humidity map:\n" +
    "0 69 1\n" +
    "1 0 69\n" +
    "\n" +
    "humidity-to-location map:\n" +
    "60 56 37\n" +
    "56 93 4"

function extractNumbers(str) {
    return str.trim().split( /\s+/).map(nb => Number(nb))
}

function getMapAndSeed(input) {
    const lines = input.split('\n')
    const seeds = []
    const maps = []
    let mapIndex = -1

    for(let line of lines) {

        if(line.includes('seeds:')){
            extractNumbers(line.split(':')[1]).forEach((nb) => seeds.push(nb))
        }

        if(line.includes('map')) {
            maps.push({name: line.split(' ')[0], dStarts: [], sStarts: [], range: []})
            mapIndex ++
        }

        if(/^[^A-Za-z]+$/.test(line) && /\s+/.test(line)) {
            const numbers = extractNumbers(line)
            maps[mapIndex].dStarts.push(numbers[0])
            maps[mapIndex].sStarts.push(numbers[1])
            maps[mapIndex].range.push(numbers[2])
        }
    }
    return {maps, seeds}
}

function lowestLocationNumber(input) {
    const {maps, seeds} = getMapAndSeed(input)

    const locations = seeds.map(seed => {
        let currentLocation = seed
        for(const {sStarts, dStarts, range} of maps) {
            // console.log({sStarts, dStarts, range, currentLocation})
            const index = sStarts.findIndex((sourceStart, idx) => currentLocation >= sourceStart && currentLocation < sourceStart + range[idx])

            if(index === -1) continue
            currentLocation = currentLocation - (sStarts[index] - dStarts[index])
        }
        return currentLocation
    })

    return Math.min(...locations)
}

console.log(lowestLocationNumber(input))