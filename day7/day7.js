import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = "32T3K 765\n" +
    "T55J5 684\n" +
    "KK677 28\n" +
    "KTJJT 220\n" +
    "QQQJA 483"

const cards = {
    'A': 12,
    'K': 11,
    'Q': 10,
    'J': 9,
    'T': 8,
    '9': 7,
    '8': 6,
    '7': 5,
    '6': 4,
    '5': 3,
    '4': 2,
    '3': 1,
    '2': 0,
}

const strenght = {
    highCard: '1,1,1,1,1',
    onePair: '1,1,1,2',
    twoPair: '1,2,2',
    threeOfAKind: '1,1,3',
    fullHouse: '2,3',
    fourOfAKind: '1,4',
    fiveOfAKind: '5'
}

function getHands (input) {
    const lines = input.split("\n");
    return lines.map(line => {
        const [hand, bid] = line.split(/\s+/)
        const cards = hand.split('')
        const cardOccurrences = {};
        cards.forEach((card) => {
            cardOccurrences[card] = (cardOccurrences[card] || 0) + 1;
        });

        const strengthHandArray= Object.values(cardOccurrences).sort((a, b) => a - b).join();
        let strengthHand = 0

        switch(strengthHandArray) {
            case strenght.highCard:
                strengthHand = 0
                break;
            case strenght.onePair:
                strengthHand = 1
                break;
            case strenght.twoPair:
                strengthHand = 2
                break;
            case strenght.threeOfAKind:
                strengthHand = 3
                break;
            case strenght.fullHouse:
                strengthHand = 4
                break;
            case strenght.fourOfAKind:
                strengthHand = 5
                break;
            case strenght.fiveOfAKind:
                strengthHand = 6
                break;
            default:
                throw new Error("Invalid strength")
        }

        return {hand, bid, strengthHand}
    })
}

function sortHands(handA, handB){
    if (handA.strengthHand === handB.strengthHand) {
        const cardsA = handA.hand.split('');
        const cardsB = handB.hand.split('');

        for (let i = 0; i < cardsA.length; i++) {
            const valueA = cards[cardsA[i]];
            const valueB = cards[cardsB[i]];

            if (valueA !== valueB) {
                return valueA - valueB;
            }
        }
    } else {
        return handA.strengthHand - handB.strengthHand;
    }
}

function getTotalWining(input) {
    const hands = getHands(input)
    hands.sort(sortHands)

    console.log({handsSorted: hands})
    return hands.reduce((acc, hand, idx)=> {
        return acc + ((idx+1)*hand.bid)
    }, 0)
}

console.log(getTotalWining(input))