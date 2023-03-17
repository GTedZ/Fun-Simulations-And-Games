function createArray() {
    const arr = [];
    for (let x = 0; x < 100; x++) {
        arr[x] = x;
    }

    return arr;
}

function createRandomizedArray() {
    const arr = createArray();
    const randomizedArray = [];

    while (arr.length != 0) {
        const element = shiftRandomElementOfArray(arr);
        randomizedArray.push(element);
    }

    return randomizedArray;
}

function shiftRandomElementOfArray(arr) {
    const index = random(0, arr.length);
    const element = arr[index];
    arr.splice(index, 1);
    return element;
}

function random(low, high) {
    return low + Math.floor(Math.random() * high);
}

module.exports = {
    createArray,
    createRandomizedArray
}