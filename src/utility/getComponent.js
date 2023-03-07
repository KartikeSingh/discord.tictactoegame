const Discord = require('discord.js');
const getEmoji = require('./getEmoji');

const _actionRow = Discord.ButtonBuilder ? 1 : "ACTION_ROW";
const _button = Discord.ButtonBuilder ? 2 : "BUTTON";
const primary = Discord.ButtonBuilder ? 1 : "PRIMARY";
const danger = Discord.ButtonBuilder ? 4 : "DANGER";

/**
 * A Module to get the components for the message
 * @param {Array<Number>} options 
 * @returns 
 */
async function getComponents(options) {
    const row1 = {
        type: _actionRow,
        components: []
    },
        row2 = {
            type: _actionRow,
            components: []
        },
        row3 = {
            type: _actionRow,
            components: []
        },
        row4 = {
            type: _actionRow,
            components: [{
                type: _button,
                label: "End Game",
                customId: "0_tic_tac_toe",
                style: danger,
                emoji: "❌",
            }]
        };

    let i = 1;

    for (; i < 4; i++)  row1.components.push({
        type: _button,
        customId: `${i}_tic_tac_toe`,
        style: primary,
        emoji: getEmoji(i),
        disabled: !options.includes(i)
    });

    for (; i < 7; i++)  row2.components.push({
        type: _button,
        customId: `${i}_tic_tac_toe`,
        style: primary,
        emoji: getEmoji(i),
        disabled: !options.includes(i)
    });

    for (; i < 10; i++) row3.components.push({
        type: _button,
        customId: `${i}_tic_tac_toe`,
        style: primary,
        emoji: getEmoji(i),
        disabled: !options.includes(i)
    });

    return [row1, row2, row3, row4];
}

module.exports = getComponents;
