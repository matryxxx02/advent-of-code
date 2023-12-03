import {readInputFile} from "../readInputFile.js";

console.log('First Day')

const inputFirstExample = "1abc2\n" +
    "pqr3stu8vwx\n" +
    "a1b2c3d4e5f\n" +
    "treb7uchet"

const input = readInputFile("./day1/input.txt")

function getSumOfCalibrationValues(input) {
    const regex = /\d+/g
    let SumOfCalibrationValues = 0
    const lines = input.split("\n")
    lines.forEach(line => {
        const numbers = line.match(regex)
        const firstNumber = numbers[0]
        const lastNumber = numbers[numbers.length-1]
        const calibrationValue = firstNumber[0] + lastNumber[lastNumber.length-1]
        SumOfCalibrationValues+=Number(calibrationValue)
    })

    return SumOfCalibrationValues
}

const sum = getSumOfCalibrationValues(input)
console.log(sum)

const inputExample = "two1nine\n" +
    "eightwothree\n" +
    "abcone2threexyz\n" +
    "xtwone3four\n" +
    "4nineeightseven2\n" +
    "zoneight234\n" +
    "7pqrstsixteen"

const numbersInWords = {
    one: '1', two: '2', three: '3', four: '4', five: '5',
    six: '6', seven: '7', eight: '8', nine: '9'
};

function findDigitInString(string) {

    const foundDigitMap = new Map();

    Object.keys(numbersInWords).forEach(word => {
        let index = string.indexOf(word);
        while (index != -1) {
            foundDigitMap.set(index, numbersInWords[word]);
            index = string.indexOf(word, index + 1);
        }
    });

    ['1','2','3','4','5','6','7','8','9'].forEach(number => {
        let index = string.indexOf(number);
        while (index != -1) {
            foundDigitMap.set(index, number);
            index = string.indexOf(number, index + 1);
        }
    })

    return Array.from(foundDigitMap.keys()).sort((a, b) => a - b).map(index => foundDigitMap.get(index));

}

function getSumOfCalibrationValuesPart2(input) {
    let SumOfCalibrationValues = 0
    const lines = input.split("\n")

    lines.forEach(line => {
        const digitsArray = findDigitInString(line)
        const firstDigit = digitsArray[0]
        const lastDigit = digitsArray[digitsArray.length-1]
        const calibrationValue = firstDigit + lastDigit

        SumOfCalibrationValues+= Number(calibrationValue)
    })
    return SumOfCalibrationValues
}

const sumPart2 = getSumOfCalibrationValuesPart2(input)
console.log(sumPart2)