const Discord = require('discord.js');
const getEmoji = require('./getEmoji');

/**
 * A Module to get the components for the message
 * @param {Array<Number>} options 
 * @returns 
 */
async function getComponents(options) {
    const row1 = new Discord.ActionRowBuilder(),
        row2 = new Discord.ActionRowBuilder(),
        row3 = new Discord.ActionRowBuilder(),
        row4 = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setEmoji("❌")
                    .setLabel("End Game")
                    .setCustomId("0_tic_tac_toe")
            );

    let i = 1;

    for (; i < 4; i++)  row1.addComponents(new Discord.ButtonBuilder().setCustomId(`${i}_tic_tac_toe`).setStyle(Discord.ButtonStyle.Primary).setEmoji(getEmoji(i)).setDisabled(!options.includes(i)))
    for (; i < 7; i++)  row2.addComponents(new Discord.ButtonBuilder().setCustomId(`${i}_tic_tac_toe`).setStyle(Discord.ButtonStyle.Primary).setEmoji(getEmoji(i)).setDisabled(!options.includes(i)))
    for (; i < 10; i++) row3.addComponents(new Discord.ButtonBuilder().setCustomId(`${i}_tic_tac_toe`).setStyle(Discord.ButtonStyle.Primary).setEmoji(getEmoji(i)).setDisabled(!options.includes(i)))

    return [row1, row2, row3, row4];
}

module.exports = getComponents;
