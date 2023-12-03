import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')

const inputExample = "467..114..\n" +
    "...*......\n" +
    "..35..633.\n" +
    "......#...\n" +
    "617*......\n" +
    ".....+.58.\n" +
    "..592.....\n" +
    "......755.\n" +
    "...$.*....\n" +
    ".664.598.."


function sumOfPartNumber(input) {
    const lines = input.split("\n")
    const inputVal = lines.map(line => line.match(/(?:\d+|\.|\+|[^0-9+\.])/g))
    const matrix = lines.map(line => line.split(''))
    const symbolesRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/;

    function isPartNumber(indexLine, indexCol, indexColMatrix, value) {
        const leftSymbol = indexCol > 0 && symbolesRegex.test(inputVal[indexLine][indexCol - 1]);
        const rightSymbol = indexCol < inputVal[indexLine].length - 1 && symbolesRegex.test(inputVal[indexLine][indexCol + 1]);

        const indexColMin = Math.max(indexColMatrix - 1, 0);
        const indexColMax = Math.min(indexColMatrix + value.length + 1, matrix[indexLine].length);

        const upperLine = indexLine > 0 && matrix[indexLine - 1].slice(indexColMin, indexColMax).some(val => symbolesRegex.test(val));
        const lowerLine = indexLine < lines.length - 1 && matrix[indexLine + 1].slice(indexColMin, indexColMax).some(val => symbolesRegex.test(val));

        return !!(leftSymbol || rightSymbol || upperLine || lowerLine);
    }

    let sumAllPartNumbers = 0

     inputVal.forEach((line, indexLine)=> {
        let indexColMatrix = 0;
        const sumPartNumberLine = line.reduce((acc, char, indexChar) => {
            if (!isNaN(Number(char)) && isPartNumber(indexLine, indexChar, indexColMatrix, char)) {
                indexColMatrix += char.length
                return acc + Number(char)
            }
            indexColMatrix += char.length
            return acc
        }, 0)
        sumAllPartNumbers += sumPartNumberLine
    })

    return sumAllPartNumbers

}

// console.log(sumOfPartNumber(input))

function sumOfGearRatio(input) {
    const lines = input.split("\n")
    const inputVal = lines.map(line => line.match(/(?:\d+|\.|\+|[^0-9+\.])/g))
    const matrix = lines.map(line => line.split(''))
    const numberRegex = /\d+/g
    console.log(inputVal)
    function gearRatio(indexLine, indexCol, value) {
        const leftIsNumber = indexCol > 0 && numberRegex.test(inputVal[indexLine][indexCol - 1]) && window;
        const rightIsNumber = indexCol < inputVal[indexLine].length - 1 && numberRegex.test(inputVal[indexLine][indexCol + 1]);

        if(leftIsNumber)

        const indexColMin = Math.max(indexCol - 1, 0);
        const indexColMax = Math.min(indexCol + value.length + 1, matrix[indexLine].length);

        const upperLine = indexLine > 0 && matrix[indexLine - 1].slice(indexColMin, indexColMax).some(val => symbolesRegex.test(val));
        const lowerLine = indexLine < lines.length - 1 && matrix[indexLine + 1].slice(indexColMin, indexColMax).some(val => symbolesRegex.test(val));


        return !!(leftSymbol || rightSymbol || upperLine || lowerLine);
    }

    let sumAllPartNumbers = 0

    inputVal.forEach((line, indexLine)=> {
        // let indexColMatrix = 0;
        const sumPartNumberLine = line.reduce((acc, char, indexChar) => {
            if (char === "*") {
                gearRatio(indexLine, indexChar, char)
                // indexColMatrix += char.length
                return acc + Number(char)
            }
            // indexColMatrix += char.length
            return acc
        }, 0)
        sumAllPartNumbers += sumPartNumberLine
    })

    return sumAllPartNumbers

}

console.log(sumOfGearRatio(inputExample))