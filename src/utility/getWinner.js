const getNumber = require('./getNumber');

/**
 * 
 * @param {Array<Number>} player1 
 * @param {Array<Number>} player2 
 * @returns 
 */
function getWinner(player1, player2) {
    player1 = player1.map(v => typeof v === "number" ? v : getNumber(v));
    player2 = player2.map(v => typeof v === "number" ? v : getNumber(v));

    const positions = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ]

    if (positions.some(v => v.every(x => player1.includes(x)))) return 1;
    else if (positions.some(v => v.every(x => player2.includes(x)))) return 2;
    else if (player1.length + player2.length === 9) return 0;
    else return -1;
}

module.exports = getWinner;