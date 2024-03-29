const Discord = require('discord.js');
const getEmergencyMove = require('./getEmergencyMove');
const getEmoji = require('./getEmoji');
const getNumber = require('./getNumber');

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
            if (this.chooseMoveMessage) {
                let _msg_ = await channel.send({ content: `${user.toString()}, Choose your next move from the buttons` });
                setTimeout(() => _msg_.delete().catch(() => { }), this.autoDelete);
            }

            const collector = channel.createMessageComponentCollector({ filter: (i) => i.user.id === user.id && (i.customId.endsWith("_tic_tac_toe")), time: 30000 });

            collector.on('collect', async (interaction) => {
                const userChoice = parseInt(interaction.customId[0]);

                if (userChoice === 0) return collector.stop("cancel");

                options = options.filter(v => v !== userChoice);
                player1.push(userChoice);

                if (bot && options.length > 0) {
                    let c = getEmergencyMove(bot, player1) || options[Math.floor(Math.random() * options.length)];
                    bot.push(c);
                    options = options.filter(v => v !== c);
                }

                let _msg;

                if (bot) _msg = await interaction.reply({ ephemeral: true, content: "You chose" + getEmoji(userChoice) + "\nAnd I chose : " + getEmoji(bot[bot.length - 1]) });
                else _msg = await interaction.reply({ ephemeral: false, content: `${user.username} chose ${getEmoji(userChoice)}` });

                setTimeout(() => {
                    interaction.channel.messages.delete(_msg).catch(() => { });
                }, this.autoDelete)

                collector.stop(userChoice);
            });

            collector.once('end', async (f, r) => {
                if (r === "time") res({ reason: "time", user: user.username });
                else if (r === "cancel") res({ reason: "cancel", user: user.username });
                else res({ choice: getEmoji(r), options, player1: player1.map(v => typeof v === "number" ? v : getNumber(v)), bot: bot.map(v => typeof v === "number" ? v : getNumber(v)) });
            });
        } catch (e) {
            console.log(e)
            rej(e);
        }
    })
}

module.exports = getChoice;