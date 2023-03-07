const Discord = require("discord.js");

const _embedBuilder = Discord.EmbedBuilder || Discord.MessageEmbed;
const _actionRow = Discord.ButtonBuilder ? 1 : "ACTION_ROW";
const _button = Discord.ButtonBuilder ? 2 : "BUTTON";
const secondary = Discord.ButtonBuilder ? 2 : "SECONDARY";
const danger = Discord.ButtonBuilder ? 4 : "DANGER";

/**
 * 
 * @param {Discord.User} player 
 * @returns 
 */
async function getApproval(player, message) {
    return new Promise(async (res, rej) => {
        try {
            const channel = await player.createDM();
            const msg = await channel.send({
                components: [{
                    type: _actionRow,
                    components: [{
                        type: _button,
                        label: "Accept",
                        customId: "1_tic_tac_toe_choose",
                        style: secondary,
                        emoji: "✔",
                    },
                    {
                        type: _button,
                        label: "Reject",
                        customId: "2_tic_tac_toe_choose",
                        style: danger,
                        emoji: "❌",
                    }]
                }],
                embeds: [
                    new _embedBuilder({
                        title: this.requestTitle,
                        fields: [{
                            name: "Sender",
                            value: message.author.username,
                            inline: true
                        }, {
                            name: "Server",
                            value: message.guild.name,
                            inline: true
                        },
                        {
                            name: "Channel",
                            value: message.channel.toString(),
                            inline: true
                        }]
                    }).setColor("#00008B").toJSON()
                ]
            });

            const collector = msg.createMessageComponentCollector({ filter: (i) => i.user.id === player.id && i.message.id === msg.id && i.customId.endsWith("_tic_tac_toe_choose"), time: 30000 })

            collector.on('collect', (i) => { collector.stop(i.customId[0]) });

            collector.on('end', (f, r) => {
                let move = true;
                if (r === "time" || r === "2") move = false;

                if (r === "time") {
                    message.channel.send({
                        embeds: [
                            new _embedBuilder({
                                title: `${player.username} was too lazy to reply,\nso game is ended`
                            }).setColor("#ff0000").toJSON()
                        ]
                    });
                    msg.reply({
                        embeds: [
                            new _embedBuilder({
                                title: "You took too long to respond"
                            }).setColor("#ff0000").toJSON()
                        ]
                    });
                } else if (r === "2") {
                    message.channel.send({
                        embeds: [
                            new _embedBuilder({
                                title: `${player.username} declined to join the game`
                            }).setColor("#ff0000").toJSON()
                        ]
                    });
                    f.first().reply({
                        embeds: [
                            new _embedBuilder({
                                title: "Successfully denied game invitation"
                            }).setColor("#00e82b").toJSON()
                        ]
                    });
                    msg.delete()
                } else if (r === "1") {
                    msg.delete()
                    message.channel.send({
                        embeds: [
                            new _embedBuilder({
                                title: `${player.username} Accepted the game invitation`
                            }).setColor("#00e82b").toJSON()
                        ]
                    });

                    f.first().reply({
                        embeds: [
                            new _embedBuilder({
                                title: "Successfully accepted game invitation"
                            }).setColor("#ff0000").toJSON()
                        ]
                    });
                }

                res(move);
            })
        } catch (e) {
            console.log(e);

            rej(false);
        }
    })
}

module.exports = getApproval;