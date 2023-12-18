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
        return ({direction: values[0], count: Number(values[1])})
    })
}

function dig(input) {
    const directions = getDirections(input)
    const matrix = [['#']]
    let i = 0
    let j = 0
    let newI
    let newJ

    for (let {direction, count} of directions) {
        // console.log({i, j, direction, count})
        switch(direction) {
            case 'R' :
                newJ = j + count

                if(newJ >= matrix[i].length) {
                    //ajouter a tous les lignes les char manquant + '#'
                    matrix.forEach((line, idx) => {
                        if(idx === i) matrix[idx].push(...Array.from({ length: count }, () => '#'))
                        else matrix[idx].push(...Array.from({ length: count }, () => '.'))
                    })
                } else {
                    matrix[i].splice(j, count, ...Array.from({ length: count }, () => '#'))
                }
                j = newJ

                break;
            case 'L' :
                newJ = j - count

                if(newJ < 0){
                    //ajouter a tous les lignes les char manquant + '#'
                    matrix.forEach((line, idx) => {
                        if(idx === i) matrix[idx].splice(0,0, ...Array.from({ length: count }, () => '#'))
                        else matrix[idx].splice(0,0, ...Array.from({ length: count }, () => '.'))
                    })
                    j = 0
                } else {
                    matrix[i].splice(newJ, count, ...Array.from({ length: count }, () => '#'))
                    j = newJ
                }

                break;
            case 'U' :
                newI = i - count
                if(newI < 0){
                    // ajouter des lignes en haut
                    for(let indice = i; indice>newI ;indice--) {
                        const newLine = Array.from({ length: matrix[i].length }, () => '.')
                        newLine[j] = '#'
                        matrix.splice(0,0,newLine)
                    }
                    i = 0
                } else {
                    for(let indice = i; indice>newI ;indice--) {
                        matrix[indice][j] = '#'
                    }
                    i = newI
                }

                break;

            case 'D' :
                newI = i + count
                if(newI >= matrix.length) {
                    // ajouter des lignes en bas
                    for(let indice = i; indice<newI ;indice++) {
                        const newLine = Array.from({ length: matrix[i].length }, () => '.')
                        newLine[j] = '#'
                        matrix.push(newLine)
                    }
                } else {
                    for(let indice = i; indice<newI ;indice++) {
                        matrix[indice][j] = '#'
                    }
                }
                i = newI

                break;
        }
    }

    return matrix
}

function displayMatrix(matrix) {
    return matrix.reduce((acc, line) => acc+ (line.join('') + '\n'), "")
}

function digOutTheInterior(array) {
    let tableauModifie = array;
    // console.log(array)
    array.filter(line => line.filter((l) => l === '#').length >= 2).forEach((line, i) => {
        let inside = false
        console.log({rr: Object.entries(line)})
        for(let [j, char] of Object.entries(line)) {
            console.log({inside, char})
            if(!inside && char === "#") {
                inside = true
            } else if(inside && char !== "#") {
                tableauModifie[i][j] = "#"
            } else if(inside) {
                inside = false
                break;
            }
        }
    })
    return tableauModifie;
}

const res = dig(inputExample)
console.log(displayMatrix(res))
const resInter = digOutTheInterior(res)
console.log(displayMatrix(resInter))