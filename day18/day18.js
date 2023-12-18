import {readInputFile} from "../readInputFile.js";

const inputExample = "R 6 (#70c710)\n" +
    "D 5 (#0dc571)\n" +
    "L 2 (#5713f0)\n" +
    "D 2 (#d2c081)\n" +
    "R 2 (#59c680)\n" +
    "D 2 (#411b91)\n" +
    "L 5 (#8ceee2)\n" +
    "U 2 (#caa173)\n" +
    "L 1 (#1b58a2)\n" +
    "U 2 (#caa171)\n" +
    "R 2 (#7807d2)\n" +
    "U 3 (#a77fa3)\n" +
    "L 2 (#015232)\n" +
    "U 2 (#7a21e3)"

const input = readInputFile("input.txt")

function getDirections(input) {
    const lines = input.split('\n')
    return lines.map(line => {
        const values = line.split(" ")
        return ({direction: values[0], count: values[1]})
    })
}

function dig(input) {
    const directions = getDirections(input)
    const matrix = [['#']]
    let i = 0
    let j = 0

    for (let {direction, count} of directions) {
        switch(direction) {
            case 'R' :
                j += count
                // matrix[index.x].push(Array.from({ length: count }, () => '#'))
                if(j <= matrix[i].length)
                    //ajouter a tous les lignes les char manquant + '#'
                if
                break;
            case 'L' :
                j -= count
                if(j < 0)
                    //ajouter a tous les lignes les char manquant + '#'

                const start = index.x-count
                // matrix.forEach((line, idx) => {
                //
                // })
                // matrix[index.x].splice(start > 1 ? start : 0, 0, Array.from({ length: count }, () => '#'))
                break;
            case 'U' :
                x += count
                break;
            case 'D' :
                x -= count
                break;

        }
    }
}