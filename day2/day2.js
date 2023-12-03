import {readInputFile} from "../readInputFile.js";

console.log('Seconde day')

const input = readInputFile('./input.txt')

const inputExample = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\n" +
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\n" +
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\n" +
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\n" +
    "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"

const extractNumbers = (value) => {
    const regex = /\d+/g
    return value.match(regex)[0]
}

function countPossibleGames(input) {
    const cubesMax = {
        red: 12,
        green: 13,
        blue: 14,
    }

    const gameIsPossible = (value) => {
        const cubesCount = {
            red: 0,
            green: 0,
            blue: 0,
        }

        Object.keys(cubesCount).forEach(cubeColor => {
            const colorRegex = new RegExp(`\\b(\\d+\\s+${cubeColor})\\b`, 'g');
            const cubeValues = value.match(colorRegex)
            if(cubeValues) {
                cubesCount[cubeColor] = cubeValues.reduce((acc, val) => {
                    const cubeCount = parseInt(val.match(/\d+/)[0]);
                    return acc + cubeCount;
                }, 0);
            }
        })

        return Object.keys(cubesMax).every((color) => {
            return cubesCount[color] <= cubesMax[color];
        });
    }

    const lines = input.split("\n")
    return lines.reduce(((acc, line) => {
        const splitedLine = line.split(':')
        const gameNumber = Number(extractNumbers(splitedLine[0]))
        const setGames = splitedLine[1].split(';')

        for(let game of setGames) {
            const possibleGame = gameIsPossible(game)
            if (!possibleGame) {
                console.log(`Set ${gameNumber} ❌`)
                return acc
            }
        }

        console.log(`Set ${gameNumber} ✅ `)

        return acc + gameNumber;
    }), 0)
}

// console.log(countPossibleGames(input))

function countSetsPower(input) {

    const getGamePower = (line) => {
        const cubesCount = {
            red: 0,
            green: 0,
            blue: 0,
        }

        Object.keys(cubesCount).forEach(cubeColor => {
            const colorRegex = new RegExp(`\\b(\\d+\\s+${cubeColor})\\b`, 'g');
            const cubeValues = line.match(colorRegex) //["3 green", 2 green"]

            if(cubeValues && cubeValues.length > 0) {
                cubesCount[cubeColor] = Math.max(...cubeValues.map(val => Number(extractNumbers(val))))
            }
        })

        return cubesCount.red * cubesCount.green * cubesCount.blue
    }

    const lines = input.split("\n")
    return lines.reduce(((acc, line) => {
        const splitedLine = line.split(':')
        const set = splitedLine[1]
        const gamePower = getGamePower(set)
        console.log(`GamePwer ${gamePower} `)

        return acc + gamePower;
    }), 0)
}

console.log(countSetsPower(input))
