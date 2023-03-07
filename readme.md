# Installation
```
npm i discord.tictactoe
```

# What is this for?
This package is created for making a Tic-Tac-Toe game for discord bots with Message Components.

# Why?
This package is very easy to use and you can request new updates and stuff simply by messaging me on my [discord server](https://discord.gg/XYnMTQNTFh)

# How?
```js
const ttt = require('discord.tictactoegame');
const tttInstance = new ttt();

/**
 * This method will start a Solo game between The message author and bot, everything is automatic <3
 * @param {Discord.Message} message The message object where the command was used
 * @param {Discord.Client} bot Your client object
 */
tttInstance.solo(message, bot);

/**
 * This method will start a Duo game between The message author and Player 2, everything is automatic <3
 * @param {Discord.Message} message The message object where the command was used
 * @param {Discord.User} player2 The mentioned User / second player. Note it should be a discord user Object not guild member object
 */
tttInstance.duo(message, player2);
```

# Advanced (Custom Messages)
```js
const ttt = require('discord.tictactoegame');
const tttInstance = new ttt({
    drawEndDescription: "HAHA Game ended with a draw, I am sure both player are nerds.",
    drawEndTitle: "GAME ENDED WITH A DRAW 🦕",
    endDescription: "**{winner}** is the winner and a nerd i.e. **{loser}** is the loser",
    endTitle: "Game ended with a victori",
    forceEndDescription: "Game ended forcfully by {user}",
    forceEndTitle: "A nerd ran away :(",
    requestTitle: "You have been request to join Tic Tac Toe GAME!",
    startTitle: "GAMEEEEEEEEEEEEEEEEEEEEEEEEEEE",
    timeEndDescription: "{user} is toooo sloww mannn",
    timeEndTitle: "TIMEOUTTTT !",
    autoDelete: 1600,
});

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
```

# Game Result
```js
const response = await tttInstance.solo(params); // or duo

/**
 * @property {Number} win 0 => draw, 1 => first user won, -1 => second user won
 */
response.win

/**
 * @property {Message} message the discordmessage object
 */
response.message
```

# Note
- This version works for both Discord JS 13 & 14

# Support
If you need any help or something you can get support on my [discord server](https://discord.gg/XYnMTQNTFh)


Legendary - 5% 
Rare - 15%
common - 80%


Spawn - 15%
No Spawn - 85%