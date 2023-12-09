import {readInputFile} from "../readInputFile.js";

const input = readInputFile('./input.txt')
const inputExample = "32T3K 765\n" +
    "T55J5 684\n" +
    "KK677 28\n" +
    "KTJJT 220\n" +
    "QQQJA 483"

const cards = {
    'A': 11,
    'K': 10,
    'Q': 9,
    'T': 8,
    '9': 7,
    '8': 6,
    '7': 5,
    '6': 4,
    '5': 3,
    '4': 2,
    '3': 1,
    '2': 0,
    'J': 0,
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
            if(card !== 'J') {
                cardOccurrences[card] = (cardOccurrences[card] || 0) + 1;
            }
        });

        if(cards.includes('J')){
            const nbJoker = cards.filter(char => char === 'J').length
            if(nbJoker === 5) {
                cardOccurrences['J'] = 5
            } else {
                let cardMaxVal = null
                for (let cle in cardOccurrences){
                    cardOccurrences[cle] >= (cardOccurrences[cardMaxVal] || 0) && (cardMaxVal = cle)
                }
                console.log(cardMaxVal)
                cardOccurrences[cardMaxVal] = cardOccurrences[cardMaxVal] +nbJoker;

            }
        }

        const strengthHandArray= Object.values(cardOccurrences).sort((a, b) => a - b).join();
        let strengthHand = 0

        console.log(strengthHandArray)
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
        // if(cards.filter(char => char === 'J').length === 1 && strengthHand !== 1) strengthHand +=2
        // else if(cards.includes('J')) strengthHand += cards.filter(char => char === 'J').length
        if(strengthHand > 6) strengthHand = 6
        console.log({hand, bid, strengthHand})
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

            if(valueA === 'J' || valueB === 'J')
                return valueA === 'J' ? 11- valueB : 11 - valueA
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
// 247080147
// 247078497
// 246920916
// 247850951
// too low
// 247889481