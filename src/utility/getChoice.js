const Discord = require('discord.js');
const getEmoji = require('./getEmoji');

/**
 * 
 * @param {Discord.User} user 
 * @param {Discord.TextChannel} channel 
 * @param {Array<Number>} options 
 * @param {Array<Number>} player1 
 * @param {Array<Number>} bot 
 * @returns 
 */
function getChoice(user, channel, options, player1, bot) {
    return new Promise(async (res, rej) => {
        try {
            channel.send({ content: `${user.toString()}, Choose your next move from the buttons` })

            const collector = channel.createMessageComponentCollector({ filter: (i) => i.user.id === user.id && (i.customId.endsWith("_tic_tac_toe")), time: 30000 });

            collector.on('collect', async (interaction) => {
                const userChoice = parseInt(interaction.customId[0]);

                if (userChoice === 0) return collector.stop("cancel");

                options = options.filter(v => v !== userChoice);
                player1.push(userChoice);
                if (bot && options.length > 0) {
                    let c = options[Math.floor(Math.random() * options.length)];
                    bot.push(c);
                    options = options.filter(v => v !== c);
                }

                if (bot) await interaction.reply({ ephemeral: true, content: "You chose" + getEmoji(userChoice) + "\nAnd I chose : " + getEmoji(bot[bot.length - 1]) });
                else await interaction.reply({ ephemeral: false, content: `${user.username} chose ${getEmoji(userChoice)}` });

                collector.stop(userChoice);
            });

            collector.once('end', async (f, r) => {
                if (r === "time") res({ reason: "time", user: user.username });
                else if (r === "cancel") res({ reason: "cancel", user: user.username });
                else res({ choice: getEmoji(r), options: options, player1: player1, bot: bot });
            });
        } catch (e) {
            console.log(e)
            rej(e);
        }
    })
}

module.exports = getChoice;