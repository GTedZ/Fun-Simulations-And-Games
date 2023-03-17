const lib = require('./lib');

const withStrategy = JSON.parse(process.argv[2]);

let oldWin = 0;
let wins = 0;
let losses = 0;
let totalGames = 0;


async function runStatistics() {
    while (true) {
        // console.clear();
        if (withStrategy) runSimulationWithAlgorithm();
        else runSimulationWithoutAlgorithm()


        if (oldWin == wins) continue;
        console.log({ wins, losses, totalGames, winRate: Math.floor((wins / totalGames) * 1000000) / 10000 + '%' })
        oldWin = wins;
    }
}
runStatistics();

function runSimulationWithAlgorithm() {
    totalGames++;

    const users = lib.createRandomizedArray();
    const boxes = lib.createRandomizedArray();

    for (let x = 0; x < users.length; x++) {
        const userNumber = users[x];

        const [isSuccess, tries] = fetchBox(userNumber, userNumber);
        if (!isSuccess) {
            // console.log(`Person #${x} failed to find his number within 50 tries`);
            losses++;
            return false;
        }

        // console.log(`Person #${x} needed ${tries} tries to find his number`);
    }

    wins++;
    return true;

    // functions

    function fetchBox(indexToFetch, numberToFind, tries = 0) {
        const actualValueOfBox = boxes[indexToFetch];

        if (actualValueOfBox == numberToFind) return [true, tries];
        else if (tries == 49) return [false];
        else return fetchBox(actualValueOfBox, numberToFind, tries + 1)
    }
}

function runSimulationWithoutAlgorithm() {
    totalGames++;

    const users = lib.createRandomizedArray();
    const boxes = lib.createRandomizedArray();

    for (let x = 0; x < users.length; x++) {
        const userNumber = users[x];
        const availableNumbers = lib.createRandomizedArray();

        const [isSuccess, tries] = fetchBox(availableNumbers, userNumber);
        if (!isSuccess) {
            losses++;
            return false;
        }
    }

    wins++;
    return true;

    // functions

    function fetchBox(availableNumbers, numberToFind, tries = 0) {
        const indexToFetch = availableNumbers.shift();
        const actualValueOfBox = boxes[indexToFetch];

        if (actualValueOfBox == numberToFind) return [true, tries];
        else if (tries == 49) return [false];
        else return fetchBox(availableNumbers, numberToFind, tries + 1)
    }
}