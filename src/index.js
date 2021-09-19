const Discord = require('discord.js');
const { getChoice, getComponents, getDescription, getWinner, getApproval } = require('./utility');

class TicTacToe {

    /**
     * The solo game i.e. User VS Bot
     * @param {Discord.Message} message The message in which command was used
     * @param {Discord.Client} bot The discord client
     */
    async solo(message, bot) {
        let botName = bot?.user?.username || "Bot";
        if (!message || !message.author) return new Error("No message was provided")
        let options = [1, 2, 3, 4, 5, 6, 7, 8, 9], user = [], botc = [];
        const row = await getComponents(options);
        let ended = false;

        const sent = await message.channel.send({ components: row, embeds: [{ color: "DARK_VIVID_PINK", title: "Tic Tac Toe", description: getDescription(user, botc) }] })

        while (options.length !== 0) {
            let data = await getChoice(message.author, message.channel, options, user, botc);

            if (data.reason === "time" || data.reason === "cancel") {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("SECONDARY").setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_RED", title: "Game was forcefully ended", description: `Tic Tac Toe Game\n\nPlayer One : ${message.author.username}\nPlayer Two : ${botName}\n\nReason : **${data.reason === "time" ? `${data.user} took too much time to choose` : `${data.user} cancelled the game`}**` }] });
                ended = true;
                break;
            }

            options = data.options;
            user = data.player1;
            botc = data.bot;

            let rowss = await getComponents(options);
            sent.edit({ components: rowss, embeds: [{ color: "DARK_VIVID_PINK", title: "Tic Tac Toe", description: getDescription(user, botc) }] })

            let win = getWinner(user, botc);
            if (win === 0) {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("SECONDARY").setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was an draw", description: `Tic Tac Toe Game\n\nPlayer One : ${message.author.username}\nPlayer Two : ${botName}\n\nGame Result : **Draw**` }] });
                ended = true;
                break;
            } else if (win === 1) {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setStyle("SUCCESS").setDisabled(true).setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was victorios for " + message.author.username, description: `Tic Tac Toe Game\n\nPlayer One [ Winner 👑 ] : ${message.author.username}\nPlayer Two [ Looser 🤢 ] : ${botName}\n\nGame Result : **Won By ${message.author.username}**` }] });
                ended = true;
                break;
            } else if (win === 2) {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("DANGER").setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: `Game was victorios for ${botName}`, description: `Tic Tac Toe Game\n\nPlayer One [ Looser 🤢 ] : ${message.author.username}\nPlayer Two [ Winner 👑 ] : ${botName}\n\nGame Result : **Won By ${botName}**` }] });
                ended = true;
                break;
            }
        }
        if (ended) return;
        let win = getWinner(user, botc);
        if (win === 0) {
            let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("SECONDARY").setLabel("Game Ended").setEmoji("🕊"));
            sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was an draw", description: `Tic Tac Toe Game\n\nPlayer One : ${message.author.username}\nPlayer Two : ${botName}\n\nGame Result : **Draw**` }] });
            ended = true;
        } else if (win === 1) {
            let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setStyle("SUCCESS").setDisabled(true).setLabel("Game Ended").setEmoji("🕊"));
            sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was victorios for " + message.author.username, description: `Tic Tac Toe Game\n\nPlayer One [ Winner 👑 ] : ${message.author.username}\nPlayer Two [ Looser 🤢 ] : ${botName}\n\nGame Result : **Won By ${message.author.username}**` }] });
            ended = true;
        } else if (win === 2) {
            let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("DANGER").setLabel("Game Ended").setEmoji("🕊"));
            sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was victorios for ${botName}", description: `Tic Tac Toe Game\n\nPlayer One [ Looser 🤢 ] : ${message.author.username}\nPlayer Two [ Winner 👑 ] : ${botName}\n\nGame Result : **Won By ${botName}**` }] });
            ended = true;
        }
    }

    async duo(message, player2) {
        if (!message || !message.author) return new Error("No message was provided");
        if(!player2 || !player2.username) return new Error("No Player 2 was provided");

        if (await getApproval(player2, message) === false) return;

        let options = [1, 2, 3, 4, 5, 6, 7, 8, 9], player1Choice = [], player2Choice = [];
        const row = await getComponents(options);
        let ended = false;

        const sent = await message.channel.send({ components: row, embeds: [{ color: "DARK_VIVID_PINK", title: "Tic Tac Toe", description: getDescription(player1Choice, player2Choice) }] })

        for (let i = 1; options.length !== 0; i++) {
            let data = await getChoice(i % 2 !== 0 ? message.author : player2, message.channel, options, i % 2 !== 0 ? player1Choice : player2Choice);

            if (data.reason === "time" || data.reason === "cancel") {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("SECONDARY").setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_RED", title: "Game was forcefully ended", description: `Tic Tac Toe Game\n\nPlayer One : ${message.author.username}\nPlayer Two : ${player2.username}\n\nReason : **${data.reason === "time" ? `${data.user} took too much time to choose` : `${data.user} cancelled the game`}**` }] });
                ended = true;
                break;
            }

            options = data.options;
            i % 2 !== 0 ? player1Choice = data.player1 : player2Choice = data.player1;

            let rowss = await getComponents(options);
            sent.edit({ components: rowss, embeds: [{ color: "DARK_VIVID_PINK", title: "Tic Tac Toe", description: getDescription(player1Choice, player2Choice) }] })

            let win = getWinner(player1Choice, player2Choice);
            if (win === 0) {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("SECONDARY").setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was an draw", description: `Tic Tac Toe Game\n\nPlayer One : ${message.author.username}\nPlayer Two : ${player2.username}\n\nGame Result : **Draw**` }] });
                ended = true;
                break;
            } else if (win === 1) {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setStyle("SUCCESS").setDisabled(true).setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was victorios for " + message.author.username, description: `Tic Tac Toe Game\n\nPlayer One [ Winner 👑 ] : ${message.author.username}\nPlayer Two [ Looser 🤢 ] : ${player2.username}\n\nGame Result : **Won By ${message.author.username}**` }] });
                ended = true;
                break;
            } else if (win === 2) {
                let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("DANGER").setLabel("Game Ended").setEmoji("🕊"));
                sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was victorios for ${player2.username}", description: `Tic Tac Toe Game\n\nPlayer One [ Looser 🤢 ] : ${message.author.username}\nPlayer Two [ Winner 👑 ] : ${player2.username}\n\nGame Result : **Won By ${player2.username}**` }] });
                ended = true;
                break;
            }
        }
        if (ended) return;
        let win = getWinner(user, botc);
        if (win === 0) {
            let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("SECONDARY").setLabel("Game Ended").setEmoji("🕊"));
            sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was an draw", description: `Tic Tac Toe Game\n\nPlayer One : ${message.author.username}\nPlayer Two : ${player2.username}\n\nGame Result : **Draw**` }] });
            ended = true;
        } else if (win === 1) {
            let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setStyle("SUCCESS").setDisabled(true).setLabel("Game Ended").setEmoji("🕊"));
            sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was victorios for " + message.author.username, description: `Tic Tac Toe Game\n\nPlayer One [ Winner 👑 ] : ${message.author.username}\nPlayer Two [ Looser 🤢 ] : ${player2.username}\n\nGame Result : **Won By ${message.author.username}**` }] });
            ended = true;
        } else if (win === 2) {
            let r = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("no_need_of_id_here").setDisabled(true).setStyle("DANGER").setLabel("Game Ended").setEmoji("🕊"));
            sent.edit({ components: [r], embeds: [{ color: "DARK_BUT_NOT_BLACK", title: "Game was victorios for ${player2.username}", description: `Tic Tac Toe Game\n\nPlayer One [ Looser 🤢 ] : ${message.author.username}\nPlayer Two [ Winner 👑 ] : ${player2.username}\n\nGame Result : **Won By ${player2.username}**` }] });
            ended = true;
        }
    }
}

module.exports = new TicTacToe();