const { User, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

/**
 * 
 * @param {User} player 
 * @returns 
 */
async function getApproval(player, message) {
    return new Promise(async (res, rej) => {
        try {
            const channel = await player.createDM();
            const msg = await channel.send({
                components: [
                    new ActionRowBuilder()
                        .addComponents([
                            new ButtonBuilder()
                                .setCustomId("1_tic_tac_toe_choose")
                                .setStyle(ButtonStyle.Success)
                                .setEmoji("✔")
                                .setLabel("Accept"),
                            new ButtonBuilder()
                                .setCustomId("2_tic_tac_toe_choose")
                                .setStyle(ButtonStyle.Danger)
                                .setEmoji("❌")
                                .setLabel("Reject")
                        ])
                ],
                embeds: [
                    new EmbedBuilder({
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
                    }).setColor("DarkNavy")
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
                            new EmbedBuilder({
                                title: `${player.username} was too lazy to reply,\nso game is ended`
                            }).setColor("Red")
                        ]
                    });
                    msg.reply({
                        embeds: [
                            new EmbedBuilder({
                                title: "You took too long to respond"
                            }).setColor("Red")
                        ]
                    });
                } else if (r === "2") {
                    message.channel.send({
                        embeds: [
                            new EmbedBuilder({
                                title: `${player.username} declined to join the game`
                            }).setColor("Red")
                        ]
                    });
                    f.first().reply({
                        embeds: [
                            new EmbedBuilder({
                                title: "Successfully denied game invitation"
                            }).setColor("Green")
                        ]
                    });
                    msg.delete()
                } else if (r === "1") {
                    msg.delete()
                    message.channel.send({
                        embeds: [
                            new EmbedBuilder({
                                title: `${player.username} Accepted the game invitation`
                            }).setColor("Green")
                        ]
                    });

                    f.first().reply({
                        embeds: [
                            new EmbedBuilder({
                                color: "GREEN",
                                title: "Successfully accepted game invitation"
                            }).setColor("Red")
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