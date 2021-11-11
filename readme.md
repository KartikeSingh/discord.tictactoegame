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
    endDescription: "**{winner}** is the winner and a nerd i.e. **{looser}** is the looser",
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
  * TThe parameters of options
  * @param {Number} autoDelete Time after which auto delete useless bot messages.
  * @param {String} startTitle The game starting title.
  * @param {String} requestTitle The title for request message in user DM.
  * @param {String} forceEndTitle The title when game is ended forcefully
  * @param {String} forceEndDescription The description when game is ended forcefully
  * @param {String} timeEndTitle The title when user failed in choosing their move.
  * @param {String} timeEndDescription The description when user failed in choosing their move.
  * @param {String} drawEndTitle The title when game ended with a draw.
  * @param {String} drawEndDescription The description when game ended with a draw.
  * @param {String} endTitle The title when game ended normally.
  * @param {String} endDescription The description when game ended normally.
*/
```

# Example Images
## The Game
![game.png](https://cdn.discordapp.com/attachments/880732844220100608/880732951573331988/unknown.png)

## Game ending
![gameend.png](https://cdn.discordapp.com/attachments/880732844220100608/880732852541612062/unknown.png)

## Duo Mode
![gamerequest.png](https://cdn.discordapp.com/attachments/880732844220100608/880733096352288808/unknown.png)

# Support
If you need any help or something you can get support on my [discord server](https://discord.gg/XYnMTQNTFh)
