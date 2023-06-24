const getNumber = require('./getNumber');

/**
 * 
 * @param {Array<Number>} player1 
 * @param {Array<Number>} player2 
 * @returns 
 */
function getEmergencyMove(player1, player2) {
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
    ];

    const used = [...player1, ...player2];

    const p1Winning = positions.filter(v => v.filter(x => player1.includes(x)).length === 2).map(v => v.filter(x => !player1.includes(x))[0]).filter(v => !player2.includes(v));
    const p2Winning = positions.filter(v => v.filter(x => player2.includes(x)).length === 2).map(v => v.filter(x => !player2.includes(x))[0]).filter(v => !player1.includes(v));

    return p1Winning?.[0] || p2Winning?.[0] || 0;
}

module.exports = getEmergencyMove;