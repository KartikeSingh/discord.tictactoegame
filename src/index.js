const Discord = require('discord.js');
const { getChoice, getComponents, getDescription, getWinner, getApproval } = require('./utility');

const _embedBuilder = Discord.EmbedBuilder || Discord.MessageEmbed;
const _actionRow = Discord.ButtonBuilder ? 1 : "ACTION_ROW";
const _button = Discord.ButtonBuilder ? 2 : "BUTTON";
const secondary = Discord.ButtonBuilder ? 2 : "SECONDARY";


class TicTacToe {

    /**
     * The Tic Tac Toe object
     * @param {Object} options The options for the game
     * @param {Number} options.autoDelete Time after which auto delete useless bot messages.
     * @param {String} options.startTitle The game starting title.
     * @param {String} options.requestTitle The title for request message in user DM.
     * @param {String} options.forceEndTitle The title when game is ended forcefully
     * @param {String} options.forceEndDescription The description when game is ended forcefully
     * @param {String} options.timeEndTitle The title when user failed in choosing their move.
     * @param {String} options.timeEndDescription The description when user failed in choosing their move.
     * @param {String} options.drawEndTitle The title when game ended with a draw.
     * @param {String} options.drawEndDescription The description when game ended with a draw.
     * @param {String} options.endTitle The title when game ended normally.
     * @param {String} options.endDescription The description when game ended normally.
     * @param {0 | 1 | 2} options.replyType How to reply? 0 => .reply, 1 => editReply, 2 => followUp
     * @param {Boolean} options.ephemeral If the created reply should be ephemeral.
     * @param {Boolean} options.chooseMoveMessage Whether bot should ask the player to choose move
    */
    constructor(options = {}) {
        if ("autoDelete" in options && typeof (options.autoDelete) !== "number" || options.autoDelete < 500) return reject("Auto delete should be an number and at least 500.")

        this.autoDelete = options.autoDelete || 3000;
        this.startTitle = options.startTitle || "Tic Tac Toe Game"
        this.requestTitle = options.requestTitle || "Tic Tac Toe Game Request"
        this.forceEndTitle = options.forceEndTitle || "Game was ended forcefully"
        this.forceEndDescription = options.forceEndDescription || "{user} was scared so they ended the game."
        this.timeEndTitle = options.timeEndTitle || "{user} is tooo slow"
        this.timeEndDescription = options.timeEndDescription || "{user} was too scared to choose their move."
        this.endTitle = options.endTitle || "The game ended with victory for {winner}";
        this.endDescription = options.endDescription || "The Winner is {winner} 👑\nThe Nerd / loser is {loser} 🤢";
        this.drawEndTitle = options.drawEndTitle || "The game ended with a draw";
        this.drawEndDescription = options.drawEndDescription || "Nobody won RIP!!!\n\nPlayer 1 : {player1}\n\nPlayer 2 : {player2}";
        this.ephemeral = typeof options.ephemeral === 'boolean' ? options.ephemeral : false;
        this.replyType = [0, 1, 2].includes(options.replyType) ? options.replyType : 0;
        this.chooseMoveMessage = typeof options.chooseMoveMessage === 'boolean' ? options.chooseMoveMessage : true;
    }

    /**
     * The solo game i.e. User VS Bot
     * @param {Discord.Message | Discord.Interaction} message The message in which command was used
     * @param {Discord.Client} bot The discord client
     */
    async solo(_message, bot) {
        return new Promise(async (response, reject) => {
            const botName = bot?.user?.username || "Bot";

            _message.author = _message.user || _message.author;

            if (!_message || !_message.author) return reject("No message was provided");

            let options = [1, 2, 3, 4, 5, 6, 7, 8, 9],
                user = [],
                botc = [],
                ended = false;

            const row = await getComponents(options);

            const message = await _message[this.replyType === 0 ? "reply" : this.replyType === 1 ? "editReply" : "followUp"]({
                components: row,
                embeds: [
                    new _embedBuilder({
                        title: this.startTitle,
                        description: getDescription(user, botc)
                    }).setColor("#9e32a8").toJSON()
                ],
                ephemeral: this.ephemeral,
                fetchReply: true
            })

            while (options.length !== 0) {
                let data = await getChoice.bind(this)(_message.author, message.channel, options, user, botc);

                if (data.reason === "time") {
                    const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }

                    message[message.editReply ? "editReply" : "edit"]({
                        components: [r],
                        embeds: [new _embedBuilder({
                            title: this.timeEndTitle.replace(/\{user\}/, _message.author.username),
                            description: this.timeEndDescription.replace(/\{user\}/, _message.author.username)
                        }).setColor("#c90209").toJSON()]
                    });

                    ended = true;
                    break;
                } else if (data.reason === "cancel") {
                    const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                    
                    message[message.editReply ? "editReply" : "edit"]({
                        components: [r],
                        embeds: [new _embedBuilder({
                            title: this.forceEndTitle.replace(/\{user\}/, _message.author.username),
                            description: this.forceEndDescription.replace(/\{user\}/, _message.author.username)
                        }).setColor("#c90209").toJSON()]
                    });

                    ended = true;
                    break;
                }

                options = data.options;
                user = data.player1;
                botc = data.bot;

                const rowss = await getComponents(options);
                message[message.editReply ? "editReply" : "edit"]({
                    components: rowss,
                    embeds: [new _embedBuilder({
                        title: this.startTitle,
                        description: getDescription(user, botc)
                    }).setColor("#9e32a8").toJSON()]
                })


                let win = getWinner(user, botc);
                let winner = win === 1 ? _message.author.username : botName;
                let loser = win === 2 ? _message.author.username : botName;

                if (win === 0) {
                    const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                    message[message.editReply ? "editReply" : "edit"]({
                        components: [r],
                        embeds: [new _embedBuilder({
                            title: this.drawEndTitle.replace(/\{player1\}/, _message.author.username).replace(/\{player2\}/, botName),
                            description: this.drawEndDescription.replace(/\{player1\}/, _message.author.username).replace(/\{player2\}/, botName)
                        }).setColor("#0a0a0a").toJSON()]
                    });

                    ended = true;

                    response({
                        message,
                        win: 0
                    });

                    break;
                } else if (win > 0){
                    const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                    message[message.editReply ? "editReply" : "edit"]({
                        components: [r],
                        embeds: [new _embedBuilder({
                            title: this.endTitle.replace(/\{winner\}/, winner).replace(/\{loser\}/, loser),
                            description: this.endDescription.replace(/\{winner\}/, winner).replace(/\{loser\}/, loser)
                        }).setColor("#0a0a0a").toJSON()]
                    });

                    ended = true;

                    response({
                        message,
                        win: win === 1 ? 1 : -1
                    });

                    break;
                }
            }

            if (ended) return;
            let win = getWinner(user, botc);
            let winner = win === 1 ? _message.author.username : botName;
            let loser = win === 2 ? _message.author.username : botName;

            if (win === 0) {
                const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                message[message.editReply ? "editReply" : "edit"]({
                    components: [r],
                    embeds: [new _embedBuilder({
                        title: this.drawEndTitle.replace(/\{player1\}/, _message.author.username).replace(/\{player2\}/, botName),
                        description: this.drawEndDescription.replace(/\{player1\}/, _message.author.username).replace(/\{player2\}/, botName)
                    }).setColor("#0a0a0a").toJSON()]
                });

                ended = true;

                response({
                    message,
                    win: 0
                });
            } else {
                const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                message[message.editReply ? "editReply" : "edit"]({
                    components: [r],
                    embeds: [new _embedBuilder({
                        title: this.endTitle.replace(/\{winner\}/, winner).replace(/\{loser\}/, loser),
                        description: this.endDescription.replace(/\{winner\}/, winner).replace(/\{loser\}/, loser)
                    }).setColor("#0a0a0a").toJSON()]
                });

                ended = true;

                response({
                    message,
                    win: win === 1 ? 1 : -1
                });
            }
        });
    }

    /**
     * 
     * @param {Discord.Message | Discord.Interaction} message 
     * @param {Discord.User} player2 
     * @returns 
     */
    async duo(_message, player2) {
        return new Promise(async (response, reject) => {
            _message.author = _message.author || _message.user;

            if (!_message || !_message.author) return reject("No _message was provided");
            if (!player2 || !player2.username) return reject("No Player 2 was provided");

            if (_message.author.id === player2.id) return reject("Player 1 And Player 2 can't be same");
            if (player2.bot) return reject("Player 2 shouldn't be a bot");

            if (await getApproval.bind(this)(player2, _message) === false) return;

            let options = [1, 2, 3, 4, 5, 6, 7, 8, 9], player1Choice = [], player2Choice = [];
            const row = await getComponents(options);
            let ended = false;

            const message = await _message[this.replyType === 0 ? "reply" : this.replyType === 1 ? "editReply" : "followUp"]({
                components: row,
                embeds: [new _embedBuilder({
                    title: this.startTitle,
                    description: getDescription(player1Choice, player2Choice)
                }).setColor("#9e32a8").toJSON()]
            })

            for (let i = 1; options.length !== 0; i++) {
                let data = await getChoice.bind(this)(i % 2 !== 0 ? _message.author : player2, message.channel, options, i % 2 !== 0 ? player1Choice : player2Choice);

                if (data.reason === "time") {
                    const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                    message[message.editReply ? "editReply" : "edit"]({
                        components: [r],
                        embeds: [new _embedBuilder({
                            title: this.timeEndTitle.replace(/\{user\}/, data.user),
                            description: this.timeEndDescription.replace(/\{user\}/, data.user)
                        }).setColor("#c90209").toJSON()]
                    });

                    ended = true;
                    break;
                } else if (data.reason === "cancel") {
                    const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                    message[message.editReply ? "editReply" : "edit"]({
                        components: [r],
                        embeds: [new _embedBuilder({
                            title: this.forceEndTitle.replace(/\{user\}/, data.user),
                            description: this.forceEndDescription.replace(/\{user\}/, data.user)
                        }).setColor("#c90209").toJSON()]
                    });

                    ended = true;
                    break;
                }

                options = data.options;
                i % 2 !== 0 ? player1Choice = data.player1 : player2Choice = data.player1;

                let rowss = await getComponents(options);
                message[message.editReply ? "editReply" : "edit"]({
                    components: rowss,
                    embeds: [new _embedBuilder({
                        title: this.startTitle,
                        description: getDescription(player1Choice, player2Choice)
                    }).setColor("#9e32a8").toJSON()]
                })


                let win = getWinner(player1Choice, player2Choice);
                let winner = win === 1 ? _message.author.username : player2.username;
                let loser = win === 2 ? _message.author.username : player2.username;

                if (win === 0) {
                    const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                    message[message.editReply ? "editReply" : "edit"]({
                        components: [r],
                        embeds: [new _embedBuilder({
                            title: this.drawEndTitle.replace(/\{player1\}/, _message.author.username).replace(/\{player2\}/, player2.username),
                            description: this.drawEndDescription.replace(/\{player1\}/, _message.author.username).replace(/\{player2\}/, player2.username)
                        }).setColor("#0a0a0a").toJSON()]
                    });

                    ended = true;

                    response({
                        message,
                        win: 0
                    })
                    break;
                } else if (win > 0){
                    const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                    message[message.editReply ? "editReply" : "edit"]({
                        components: [r],
                        embeds: [new _embedBuilder({
                            title: this.endTitle.replace(/\{winner\}/, winner).replace(/\{loser\}/, loser),
                            description: this.endDescription.replace(/\{winner\}/, winner).replace(/\{loser\}/, loser)
                        }).setColor("#0a0a0a").toJSON()]
                    });

                    ended = true;

                    response({
                        message,
                        win: win === 1 ? 1 : -1
                    })

                    break;
                }
            }
            if (ended) return;
            let win = getWinner(user, botc);
            let winner = win === 1 ? _message.author.username : player2.username;
            let loser = win === 2 ? _message.author.username : player2.username;

            if (win === 0) {
                const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                message[message.editReply ? "editReply" : "edit"]({
                    components: [r],
                    embeds: [new _embedBuilder({
                        title: this.drawEndTitle.replace(/\{player1\}/, _message.author.username).replace(/\{player2\}/, player2.username),
                        description: this.drawEndDescription.replace(/\{player1\}/, _message.author.username).replace(/\{player2\}/, player2.username)
                    }).setColor("#0a0a0a").toJSON()]
                });

                ended = true;

                response({
                    message,
                    win: 0
                })
            } else {
                const r = {
                        type: _actionRow,
                        components: [{
                            type: _button,
                            label: "Game Ended",
                            customId: "no_need_of_id_here",
                            style: secondary,
                            emoji: "🕊",
                            disabled:true
                        }]
                    }
                message[message.editReply ? "editReply" : "edit"]({
                    components: [r],
                    embeds: [new _embedBuilder({
                        title: this.endTitle.replace(/\{winner\}/, winner).replace(/\{loser\}/, loser),
                        description: this.endDescription.replace(/\{winner\}/, winner).replace(/\{loser\}/, loser)
                    }).setColor("#0a0a0a").toJSON()]
                });

                ended = true;

                response({
                    message,
                    win: win === 1 ? 1 : -1
                })
            }

        });

    }
}

module.exports = TicTacToe;