# Installations
```
npm i discord.tictactoe
```

# What?
This package is created for making Tic Tac Toe game for discord bots with rich features like Message Components.

# Why?
This package is very easy to use and you can request new updates and stuff simple by messaging me on my [discord server](https://discord.gg/XYnMTQNTFh)

# How?
```js
const _ttt = require('discord.tictactoegame');
const ttt = new _ttt();

/**
 * This method will start a Solo game between The message author and bot, everyhting is automatic <3
 * @param {Discord.Message} message The message object where command was used
 * @param {Discord.Client} bot Your client object
 */
ttt.solo(message,bot);

/**
 * This method will start a Duo game between The message author and Player 2, everyhting is automatic <3
 * @param {Discord.Message} message The message object where command was used
 * @param {Discord.User} player2 The mentioned User / second player. Note it should be a discord user Object not guild member object
 */
ttt.duo(message,player2);
```

# Advanced (Custom Messages)
```js
const _ttt = require('discord.tictactoegame');
const ttt = new _ttt({
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

## Game request for DUO Mode
![gamerequest.png](https://cdn.discordapp.com/attachments/880732844220100608/880733096352288808/unknown.png)

# Support
If you need any help or something you can get support on my [discord server](https://discord.gg/XYnMTQNTFh)